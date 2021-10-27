<template>
  <v-card>
    <v-card-title dense color='yellow'>
      <v-row dense class="pa-0 ma-0">
        <v-col class="pa-1" cols="12" md="3" lg="3" xl="3">
          <v-select
            dense
            v-model="dropdown_status_default"
            :items="dropdown_status"
            label="검색 상품상태"
            class="pa-0 ma-0 pt-1"                
            item-text="text"
            item-value="abbr"
            hide-details
            overflow
            :disabled="statusable"
            @change="changeStatus"
          ></v-select>
        </v-col>    
        <v-col class="pa-1" cols="12" md="3" lg="3" xl="3">
          <v-spacer></v-spacer>
        </v-col>      
        <v-col class="pa-1" cols="12" md="3" lg="3" xl="3">
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
                hide-details
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
        <v-col class="pa-1" cols="12" md="3" lg="3" xl="3">
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
                hide-details
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
      <v-row dense class="pa-0 ma-0">             
        <v-col class="pa-1" cols="12" md="3" lg="3" xl="3">
          <v-text-field
            v-model="search"
            class="pa-0 ma-0 mb-1"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
          ></v-text-field>
        </v-col>
        <v-col class="pa-1" cols="12" md="1" lg="1" xl="1">
          <v-spacer></v-spacer>
        </v-col>
        <v-col class="pa-1" cols="3" md="2" lg="2" xl="2">
          <v-btn-toggle
            class="pa-0 ma-0"
            v-model="toggle_multiple"
            dense
            tile
            multiple
          >
            <v-btn 
              :value="1"
              text
              width="100%"
            >
              <span class="hidden-sm-and-down">sFilter1</span>
              <v-icon right>mdi-format-color-fill</v-icon>
            </v-btn>

            <v-btn
              :value="2"
              text
              width="100%"
            >
              <span class="hidden-sm-and-down">sFilter2</span>
              <v-icon right>mdi-format-color-fill</v-icon>
            </v-btn>

            <v-btn
              :value="3"
              text
              width="100%"
            >
              <span class="hidden-sm-and-down">sFilter3</span>
              <v-icon right>mdi-format-color-fill</v-icon>
            </v-btn>

            <v-btn
              :value="4"
              text
              width="100%"
            >
              <span class="hidden-sm-and-down">sFilter4</span>
              <v-icon right>mdi-format-color-fill</v-icon>
            </v-btn>
          </v-btn-toggle>
        </v-col>
      </v-row>          
    </v-card-title>

    <v-data-table
      dense
      v-model="selected"
      :headers=headers
      :items=desserts
      :footer-props="{'items-per-page-options':[-1]}"
      hide-default-footer
      :search="search"
      :loading="loading"
      loading-text="Loading... Please wait"
      sort-by='b_date'
      item-key="b_order_id"
      show-select
      class="elevation-1 mt-3"
      @click:row="handleClick"
      @contextmenu:row="show"
      style="display:block;white-space: nowrap;overflow-x:hidden;overflow-y:auto;text-overflow:ellipsis;"
    >
      <template slot="items" slot-scope="props">
        <td>
          <v-checkbox :input-value="props.selected" hide-details class="align-center justify-center"></v-checkbox>
        </td>
      </template>
      <template v-slot:item.o_amount="{ item }">
        <v-chip
          :color="getColor(item.o_amount)"
          dark
        >
          {{ item.o_amount }}
        </v-chip>
      </template>    

      <template v-slot:top>
        <v-dialog
          v-model="dialog"
          max-width="600px"
        >
          <v-card>
            <v-card-title>
              <span class="text-h5">{{editedItem.o_product_name}}</span>
            </v-card-title>
            <v-card-subtitle>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <span class="text-h15">주문ID : {{editedItem.b_order_id}}</span>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <span class="text-h15">상품ID : {{editedItem.o_product_id}}</span>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-subtitle>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.b_enquiry" label="連絡事項"                        
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.b_supplier" label="매입처"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.b_sup_price_won" label="매입가"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.b_remarks" label="특이사항"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.b_waybill" label="주문번호"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.b_memo" label="memo"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-menu
                      v-model="menu"
                      :close-on-content-click="false"
                      :nudge-right="40"
                      transition="scale-transition"
                      offset-y
                      min-width="auto"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          v-model="date"
                          label="매입일자"
                          prepend-icon="mdi-calendar"
                          readonly
                          v-bind="attrs"
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker
                        v-model="date"
                        @input="menu = false"
                      ></v-date-picker>
                    </v-menu>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-menu
                      ref="menu"
                      v-model="menu2"
                      :close-on-content-click="false"
                      :nudge-right="40"
                      :return-value.sync="time"
                      transition="scale-transition"
                      offset-y
                      max-width="290px"
                      min-width="290px"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          v-model="time"
                          label="매입시간"
                          prepend-icon="mdi-clock-time-four-outline"
                          readonly
                          v-bind="attrs"
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-time-picker
                        v-if="menu2"
                        v-model="time"
                        full-width
                        @click:minute="$refs.menu.save(time)"
                      ></v-time-picker>
                    </v-menu>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="blue darken-1"
                text
                @click="close"
              >
                Cancel
              </v-btn>
              <v-btn
                color="blue darken-1"
                text
                @click="save"
              >
                Save
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </template>

      <!-- <template v-slot:top>
        <v-menu
            dense
            v-model="showMenu"
            :position-x="x"
            :position-y="y"
            absolute
            offset-y
            >
            <v-list>
                <v-list-item
                  dense
                  v-for="(item, index) in menus"
                  :key="index"
                >
                <v-list-item-title>{{ item.title }}</v-list-item-title>
                </v-list-item>
            </v-list>
        </v-menu>
      </template> -->

      <template v-slot:no-data>
        <v-btn
          color="primary"
          @click="initialize"
        >
          Reset
        </v-btn>
      </template>
    </v-data-table>
  </v-card>
</template>


<script>
import { mapState, mapGetters } from 'vuex'
import Util from '@/util';

  export default {
    data() {
      return {
        dialog: false,

        // 우클릭 메뉴
        showMenu: false,
        x: 0,
        y: 0,
        menus: [
            { title: '마켓 바로가기' },
            { title: '매입처 바로가기' },
            { title: '배송상태 확인' },
            { title: 'QRCode 출력' },
            { title: '주문ID Copy' },
            { title: '상품ID Copy' },
        ],
        
        
        search: "",
        
        // Multi Button
        toggle_multiple: [1, 2],

        // 검색기간 
        datesRange: [],
        date: new Date().toISOString().substr(0, 10),
        dateFrom: '',
        dateTo: '',
        dateFormatted: this.formatDate(new Date().toISOString().substr(0, 10)),
        menuFrom: false,
        menuTo: false,

        // 물품 상태 분류
        statusable: false,
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


        loading: true,
        selected: [],
        editedIndex: -1,
        editedItem: {
          o_product_id:   0, 
          o_product_name: '', 
          o_price:        0, 
          o_amount:       0,
          o_order_id:     0,  
          o_name:         '', 
          o_recv_name:    '', 
          o_recv_zip_code:'', 
          o_recv_addr:    '',
          o_recv_phone:   '', 
          o_delivery_type:'', 
          o_color_size:   '', 
          o_message:      '', 
          o_en_name:      '', 
          o_en_addr:      '', 
          o_order_memo:   '', 
          o_status:       '',
          p_brand:        '',
          b_order_id:     0, 
          b_date:         '', 
          b_enquiry:      '', 
          b_supplier:     '', 
          b_sup_price_won:0, 
          b_remarks:      '', 
          b_waybill:      '',
          b_waybill_date: '', 
          b_memo:         ''
        },
        defaultItem: {
          o_product_id:   0, 
          o_product_name: '', 
          o_price:        0, 
          o_amount:       0,
          o_order_id:     0,  
          o_name:         '', 
          o_recv_name:    '', 
          o_recv_zip_code:'', 
          o_recv_addr:    '',
          o_recv_phone:   '', 
          o_delivery_type:'', 
          o_color_size:   '', 
          o_message:      '', 
          o_en_name:      '', 
          o_en_addr:      '', 
          o_order_memo:   '', 
          o_status:       '',
          p_brand:        '',
          b_order_id:     0, 
          b_date:         '', 
          b_enquiry:      '', 
          b_supplier:     '', 
          b_sup_price_won:0, 
          b_remarks:      '', 
          b_waybill:      '',
          b_waybill_date: '', 
          b_memo:         ''
        },

        // Quick 검색
        search: '',
        editData: '',
        snack: false,
        snackColor: '',
        snackText: '',
        max10chars: v => v.length <= 10 || 'Input too long!',
        max20chars: v => v.length <= 20 || 'Input too long!',
        max50chars: v => v.length <= 50 || 'Input too long!',
        max100chars: v => v.length <= 100 || 'Input too long!',
        
        // Dialog 사용 일자/일시 변수
        date: null,
        menu: false,
        time: null,
        menu2: false,

        // Filter
        // filters: { 
        //   'b_date': [], 'p_brand': [], 'o_amount': [], 'o_color_size': [], 'o_delivery_type': [], 
        //   'o_name': [], 'b_supplier': [], 'o_status': [], 'b_waybill_date': [] 
        // },
        // activeFilters: {},
      };
    },

    computed: {
      headers: function() {
        return this.$store.getters["buylist/header"];
        // return [
        //   {
        //     text: '일자',
        //     align: 'start',
        //     // sortable: false,
        //     value: 'b_date',
        //     filter: value => {
        //         return this.activeFilters.b_date ? this.activeFilters.b_date.includes(value) : true;
        //     }
        //   },
        //   { text: '주문ID', value: 'o_order_id' },
        //   { text: '상품ID', value: 'o_product_id' },
        //   { text: '상품명', value: 'o_product_name'},
        //   { text: '브랜드', value: 'p_brand',
        //     filter: value => {
        //         return this.activeFilters.p_brand ? this.activeFilters.p_brand.includes(value) : true;
        //     }
        //   },
        //   { text: '수량', value: 'o_amount',
        //     filter: value => {
        //         return this.activeFilters.o_amount ? this.activeFilters.o_amount.includes(value) : true;
        //     }
        //   },
        //   { text: '옵션', value: 'o_color_size',
        //     filter: value => {
        //         return this.activeFilters.o_color_size ? this.activeFilters.o_color_size.includes(value) : true;
        //     }
        //   },
        //   { text: '連絡事項', value: 'b_enquiry'},
        //   { text: '성명（本名）', value: 'o_recv_name' },
        //   { text: '우편번호', value: 'o_recv_zip_code' },
        //   { text: '주소', value: 'o_recv_addr'},
        //   { text: '전화번호', value: 'o_recv_phone' },
        //   { text: '운송방법', value: 'o_delivery_type',
        //     filter: value => {
        //         return this.activeFilters.o_delivery_type ? this.activeFilters.o_delivery_type.includes(value) : true;
        //     }
        //   },
        //   { text: '구매자ID', value: 'o_name',
        //     filter: value => {
        //         return this.activeFilters.o_name ? this.activeFilters.o_name.includes(value) : true;
        //     }
        //   },
        //   { text: '매입처', value: 'b_supplier',
        //     filter: value => {
        //         return this.activeFilters.b_supplier ? this.activeFilters.b_supplier.includes(value) : true;
        //     }
        //   },
        //   { text: '매입가', value: 'b_sup_price_won'},
        //   { text: '판매가', value: 'o_price' },
        //   { text: '상태', value: 'o_status', 
        //     filter: value => {
        //         return this.activeFilters.o_status ? this.activeFilters.o_status.includes(value) : true;
        //     }
        //   },
        //   { text: '특이사항', value: 'b_remarks'},
        //   { text: '주문번호', value: 'b_waybill'},
        //   { text: '매입일', value: 'b_waybill_date', 
        //     filter: value => {
        //         return this.activeFilters.b_waybill_date ? this.activeFilters.b_waybill_date.includes(value) : true;
        //     }},
        //   { text: 'memo', value: 'b_memo'},
        // ]
      },
      desserts: function() {
        this.loading = false
        return this.$store.getters["buylist/buylist"];
      },

      // 기간검색
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

    watch: {
      dialog (val) {
        val || this.close()
      },
      // desserts (val) {
      //   this.initFilters()
      //   //this.activeFilters = {} // TODO change this
      //   //this.activeFilters = Object.assign({}, this.filters)
      // },
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

    created () {
      this.initialize()
    },

    methods: {
      initialize () {
        this.$store.dispatch('buylist/getBuylist')
      },
    
      save () {
        if (this.editedIndex > -1) {
          // console.log('editedItem(', this.editedIndex, ') : ', this.editedItem)

          this.editedItem.b_waybill_date = (this.editedItem.b_waybill) ? `${this.date} ${this.time}` : ''
          this.$store.dispatch('buylist/setUpdateBuylist', {
            row: this.editedIndex,
            item: this.editedItem
          })
        }

        this.snack = true
        this.snackColor = 'success'
        this.snackText = 'Data saved'
        this.close()
      },
      cancel () {
        this.snack = true
        this.snackColor = 'error'
        this.snackText = 'Canceled'
        this.close()
      },
      open () {
        this.snack = true
        this.snackColor = 'info'
        this.snackText = 'Dialog opened'
      },
      close () {
        this.dialog = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
          this.date = null
          this.time = null
        })
      },

      handleClick(row) {
        // set active row and deselect others
        // this.desserts.map((item, index) => {
        //     item.selected = item === row

        //     this.$set(this.desserts, index, item)
        // })

        // or just do something with your current clicked row item data
        // console.log('handleClick: ', row)



        // Dialog 사용시
        this.editedIndex = this.desserts.indexOf(row)
        this.editedItem = Object.assign({}, row)
        if( row.b_waybill_date.length > 10 ) {
          this.date = row.b_waybill_date.substring(0,10)
          this.time = row.b_waybill_date.substring(11,16)
          // console.log('b_waybill_date: ', row.b_waybill_date, ' : ', this.date, ' : ', this.time)
        } 
        this.dialog = true
      },

      // handleMenu(event, item) {
      //   // set active row and deselect others
      //   // this.desserts.map((item, index) => {
      //   //     item.selected = item === row

      //   //     this.$set(this.desserts, index, item)
      //   // })

      //   // or just do something with your current clicked row item data
      //   // console.log('handleMenu: ', event, item)
      //   console.log('handleMenu(selected): (', this.selected)
      //   console.log('handleMenu: (', item.index, ') ', item.item.o_product_name)
      //   // this.editedIndex = this.desserts.indexOf(row)
      //   // this.editedItem = Object.assign({}, row)
      //   // if( row.b_waybill_date.length > 10 ) {
      //   //   this.date = row.b_waybill_date.substring(0,10)
      //   //   this.time = row.b_waybill_date.substring(11,16)
      //   //   // console.log('b_waybill_date: ', row.b_waybill_date, ' : ', this.date, ' : ', this.time)
      //   // } 
      //   this.showMenu = false;
      //   this.x = event.clientX
      //   this.y = event.clientY
      //   this.$nextTick(() => {
      //     this.showMenu = true;
      //   });
      // },

      // 상태변경
      changeStatus(value) {
        console.log('changeStatus : ', value)
        // this.search = value
      },

      // 기간검색
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

      // 우클릭 메뉴 함수
      show (e) {
        // console.log("contextmenu: ", e)
        e.preventDefault()
        this.showMenu = false
        this.x = e.clientX
        this.y = e.clientY
        this.$nextTick(() => {
          this.showMenu = true
        })
      },

      // 수량체크 컬러
      getColor(amount) {
        Util.getAmountColor(amount);
      },

      // Filter
      // initFilters() {
      //   for (let col in this.filters) {
      //       this.filters[col] = this.desserts.map((d) => { return d[col] }).filter(
      //       (value, index, self) => { return self.indexOf(value) === index }
      //       )
      //   }
      //   // TODO restore previous activeFilters before add/remove item
      //   this.activeFilters = Object.assign({}, this.filters)
      //   /*if (Object.keys(this.activeFilters).length === 0) this.activeFilters = Object.assign({}, this.filters)
      //   else {
      //       setTimeout(() => {
      //       console.log(this.activeFilters)
      //       //this.activeFilters = Object.assign({}, this.filters)
      //       }, 1)
      //   }*/
      // },      
      // toggleAll (col) {
      //   this.activeFilters[col] = this.desserts.map((d) => { return d[col] }).filter(
      //       (value, index, self) => { return self.indexOf(value) === index }
      //   )
      // },      
      // clearAll (col) {
      //   this.activeFilters[col] = []
      // },
    },
  }
</script>