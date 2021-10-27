<template>
    <v-app>
        <v-card-title dense color='yellow'>
          <v-row class="pa-0 ma-0" align="between">
            <v-col class="pb-0 pt-0" cols="12" sm="6" md="3">
              <v-select
                dense
                v-model="dropdown_status_default"
                :items="dropdown_status"
                label="검색 상품상태"
                class="pa-0 ma-0 pt-2"
                item-text="text"
                item-value="abbr"
                hide-details
                overflow
                :disabled="statusable"
                @change="changeStatus"
              ></v-select>
            </v-col>          
            <v-col class="pb-0 pt-0" cols="12" sm="6" md="3">
              <v-menu
                ref="menuFrom"
                v-model="menuFrom"
                :close-on-content-click="false"
                transition="scale-transition"
                offset-y
                max-width="290px"
                min-width="290px"
              >
                <template class="pa-0 ma-0" v-slot:activator="{ on, attrs }">
                  <v-text-field
                    class="pa-0 ma-0"
                    v-model="dateFrom"
                    label="From"
                    append-icon="mdi-calendar"
                    v-bind="attrs"
                    v-on="on"
                />
                </template>
                <v-date-picker         
                  v-model="datesRange"
                  color="green"             
                  :max="maxDate"
                  no-title
                  range
                  @input="menuFrom = false"
                />
              </v-menu>
            </v-col>           
            <v-col class="pb-0 pt-0" cols="12" sm="6" md="3">
              <v-menu
                ref="menuTo"
                v-model="menuTo"
                :close-on-content-click="false"
                transition="scale-transition"
                offset-y
                max-width="290px"
                min-width="290px"
              >
                <template class="pa-0 ma-0" v-slot:activator="{ on, attrs }">
                  <v-text-field
                    class="pa-0 ma-0"
                    v-model="dateTo"
                    label="To"
                    append-icon="mdi-calendar"
                    v-bind="attrs"
                    v-on="on"
                  />
                </template>
                <v-date-picker
                  v-model="datesRange"
                  color="green"
                  no-title
                  range
                  @input="menuTo = false"
                  :min="minCurrentMonth"
                  :max="maxDate"
                />
              </v-menu>
            </v-col>
          </v-row>
          <v-row class="pa-0 ma-0">
            <v-col cols="12" sm="6" md="3">
              <v-text-field
                v-model="search"
                class="pa-0 ma-0 mb-1"
                append-icon="mdi-magnify"
                label="Search"
                single-line
                hide-details
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="1" md="1">
              <v-spacer></v-spacer>
            </v-col>
            <v-col cols="12" sm="6" md="3">
              <v-btn-toggle
                v-model="toggle_exclusive"
                color="gray"
                dense
                group
              >
                <v-btn
                  :value="1"
                  text
                >
                  <v-icon>mdi-format-color-fill</v-icon>
                  sFilter1
                </v-btn>

                <v-btn
                  :value="2"
                  text
                >
                  <v-icon>mdi-format-color-fill</v-icon>
                  sFilter2
                </v-btn>

                <v-btn
                  :value="3"
                  text
                >
                  <v-icon>mdi-format-color-fill</v-icon>
                  sFilter3
                </v-btn>

                <v-btn
                  :value="4"
                  text
                >
                  <v-icon>mdi-format-color-fill</v-icon>
                  sFilter4
                </v-btn>

                <v-btn
                  :value="5"
                  text
                >
                  <v-icon>mdi-format-color-fill</v-icon>
                  sFilter5
                </v-btn>
              </v-btn-toggle>
            </v-col>
          </v-row>          
        </v-card-title>
        <v-data-table
          dense
          :headers="headers"
          :items="desserts"
          :footer-props="{'items-per-page-options':[-1]}"
          hide-default-footer
          item-key="name"
          class="elevation-1"
          :search="search"
          show-select
        >
          <template dense v-slot:body.prepend>
            <tr class="ma-0" style="border-bottom: hidden;border-collapse: collapse;">
              <v-spacer></v-spacer>
              <td class="ma-0" >
                <v-text-field v-model="name" type="text" label="Dessert name"></v-text-field>
              </td>
              <td class="ma-0">
                <v-text-field v-model="calories" type="number" label="Less than"></v-text-field>
              </td>
              <td class="ma-0">
                <v-text-field v-model="fat" type="number" label="Less than"></v-text-field>
              </td>
              <td class="ma-0">
                <v-text-field v-model="carbs" type="number" label="Exact number"></v-text-field>
              </td>
              <td class="ma-0">
                <v-text-field v-model="memo" type="text" label="Dessert memo"></v-text-field>
              </td>
            </tr>
            <tr class="ma-0" style="border-collapse: collapse;">
              <td class="ma-0" :colspan="2">
                <v-icon>mdi-clipboard-edit-outline</v-icon>
                CLICK ON A FIELD TO EDIT
              </td>
              <td class="ma-0" :colspan="headers.length">
                <v-text-field 
                  v-model="temp" type="text" label="Edit"
                  dense
                  append-icon="mdi-content-save-alert"
                  clear-icon="mdi-close-circle"
                  clearable
                >
                </v-text-field>
              </td>
            </tr>                    
          </template>
        </v-data-table>
    </v-app>
</template>

<script>
export default {
    data() {
    return {
      search: "",
      name: "",
      calories: "",
      fat: "",
      carbs: "",
      memo: "",
      temp: "",

      datesRange: [],
      date: new Date().toISOString().substr(0, 10),
      dateFrom: '',
      dateTo: '',
      dateFormatted: this.formatDate(new Date().toISOString().substr(0, 10)),
      menuFrom: false,
      menuTo: false,

      dropdown_status_default: { text: 'ALL', abbr:'-1' },
      dropdown_status: [
        { text: 'ALL', abbr:'-1' },
        { text: '발주전', abbr:'00' },
        { text: '품절', abbr:'10' },
        { text: '재발주', abbr:'20' },
        { text: '발주대기', abbr:'30' },
        { text: '예약발주', abbr:'40' },
        { text: '발주완료', abbr:'50' },
        { text: '수령완료', abbr:'60' },
        { text: '검품완료', abbr:'70' },
        { text: '포장완료', abbr:'80' },
        { text: '발송완료', abbr:'90' },
        { text: '취소', abbr:'99' }
      ],
      desserts: [
        {
          name: "Frozen Yogurt",
          calories: 159,
          fat: 6.0,
          carbs: 24,
          memo: ''
        },
        {
          name: "Ice cream sandwich",
          calories: 237,
          fat: 9.0,
          carbs: 37,
          memo: ''
        },
        {
          name: "Eclair",
          calories: 262,
          fat: 16.0,
          carbs: 23,
          memo: ''
        },
        {
          name: "Cupcake",
          calories: 305,
          fat: 3.7,
          carbs: 67,
          memo: ''
        },
        {
          name: "Gingerbread",
          calories: 356,
          fat: 16.0,
          carbs: 49,
          memo: ''
        },
        {
          name: "Jelly bean",
          calories: 375,
          fat: 0.0,
          carbs: 94,
          memo: ''
        },
        {
          name: "Lollipop",
          calories: 392,
          fat: 0.2,
          carbs: 98,
          memo: ''
        },
        {
          name: "Honeycomb",
          calories: 408,
          fat: 3.2,
          carbs: 87,
          memo: ''
        },
        {
          name: "Donut",
          calories: 452,
          fat: 25.0,
          carbs: 51,
          memo: ''
        },
        {
          name: "KitKat",
          calories: 518,
          fat: 26.0,
          carbs: 65,
          memo: ''
        }
      ]
    };
  },
  watch: {
    date (val) {
      this.dateFormatted = this.formatDate(this.date)
    },
    datesRange(next, prev) {
      console.log('next', next)
      console.log('prev', prev)
      if (this.datesRange[0]) {
        this.dateFrom = this.formatDate(this.datesRange[0])
      }
      if (this.datesRange[1]) {
        this.dateTo = this.formatDate(this.datesRange[1])
      }
    }
  },
  computed: {
    headers() {
      return [
        {
          text: "Dessert (100g serving)",
          align: "left",
          sortable: false,
          value: "name",
          filter: f => { return ( f + '' ).toLowerCase().includes( this[ 'name' ].toLowerCase() ) }
        },
        {
          text: "Calories",
          value: "calories",
          filter: value => {
            if (!this.calories) return true;
            return value < parseInt(this.calories);
          }
        },
        {
          text: "Fat (g)",
          value: "fat",
          filter: value => {
            if (!this.fat) return true;
            return value < parseInt(this.fat);
          }
        },
        {
          text: "Carbs (g)",
          value: "carbs",
          filter: value => {
            if (!this.carbs) return true;
            return value == parseInt(this.carbs);
          }
        },
        {
          text: "Memo",
          value: "memo",
          filter: value => {
            if (!this.memo) return true;
            return value == parseInt(this.memo);
          }
        }
      ];
    },
    computedDateFormatted () {
      return this.formatDate(this.date)
    },
    formattedFrom() {
      
    },
    minCurrentMonth() {
      if (this.datesRange.length) {
        let current = new Date(this.datesRange[0])
        current.setDate(current.getDate() + 1)
        return current.toISOString().slice(0, 10)
      } else {
        return new Date().toISOString().slice(0, 10)
      }
    },
    maxDate() {
      return new Date().toISOString().slice(0,10)
    },
  },
  methods: {
    formatDate (date) {
      if (!date) return null

      const [year, month, day] = date.split('-')
      return `${day}/${month}/${year}`
    },
    parseDate (date) {
      if (!date) return null

      const [month, day, year] = date.split('/')
      return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
    },
  },
}
</script>
