<template>
  <v-app>
    <v-card-title>
      매입정보
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
      
      <v-container>
        <v-toolbar 
          dense
          background-color="primary"
          rounded
        >
          <v-select
            dense
            v-model="dropdown_status_default"
            :items="dropdown_status"
            label="검색 상품상태"
            class="pa-0"
            item-text="text"
            item-value="abbr"
            hide-details
            overflow
            :disabled="statusable"
            @change="changeStatus"
          ></v-select>
          <v-spacer></v-spacer>

          <template v-if="$vuetify.breakpoint.mdAndUp">
            <v-divider vertical></v-divider>
            <v-spacer></v-spacer>

            <v-select
              dense
              v-model="dropdown_period_default"
              :items="dropdown_period"
              label="검색기간"
              class="pa-0"
              item-text="text"
              item-value="abbr"
              hide-details
              overflow
              :disabled="periodable"
            ></v-select>
            <v-spacer></v-spacer>

            <v-divider vertical></v-divider>

            <v-spacer></v-spacer>

            <v-btn-toggle
              v-model="toggle_multiple"
              color="primary"
              dense
              group
              multiple
            >
              <v-btn
                :value="1"
                text
              >
                <v-icon>mdi-format-color-fill</v-icon>
                mFilter1
              </v-btn>

              <v-btn
                :value="2"
                text
              >
                <v-icon>mdi-format-color-fill</v-icon>
                mFilter2
              </v-btn>

              <v-btn
                :value="3"
                text
              >
                <v-icon>mdi-format-color-fill</v-icon>
                mFilter3
              </v-btn>

            </v-btn-toggle>

            <div class="mx-4"></div>

            <v-btn-toggle
              v-model="toggle_exclusive"
              color="primary"
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
            </v-btn-toggle>
          </template>
        </v-toolbar>
      </v-container>

      
    </v-card-title>

    <v-data-table
      dense
      :headers=headers
      :items=desserts
      :footer-props="{'items-per-page-options':[-1]}"
      hide-default-footer
      :search="search"
      :loading="loading"
      loading-text="Loading... Please wait"
      sort-by='b_date'
      class="elevation-1"
      @click:row="handleClick"
      @contextmenu:row="handleMenu"
      style="display:block;white-space: nowrap;overflow-x:hidden;overflow-y:auto;text-overflow:ellipsis;"
    >
      <!-- <template v-slot:item.b_date="props">
        <v-edit-dialog
          large 
          persistent 
          @save="saveData(props.item, 'b_date')"
          @open="editData = props.item.b_date"
        >ß
          {{ props.item.b_date }}
          <template v-slot:input>
            <v-text-field
              v-model="editData"
              :rules="[max10chars]"
              label="Edit"
              single-line`
              counter
            ></v-text-field>
          </template>
        </v-edit-dialog>
      </template> -->

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

      <template>
        <v-menu
          v-model="showMenu"
          :position-x="x"
          :position-y="y"
          absolute
          offset-y
          >
          <v-list>
            <v-list-tile v-for="menuItem in menuItems" :key="menuItem"
                        >
              <v-list-tile-title>{{menuItem}}</v-list-tile-title>
            </v-list-tile>
          </v-list>
        </v-menu>
      </template>

      <template v-slot:no-data>
        <v-btn
          color="primary"
          @click="initialize"
        >
          Reset
        </v-btn>
      </template>
    </v-data-table>
  </v-app>
</template>


<script>
import { mapState, mapGetters } from 'vuex'

  export default {
    data: () => ({
      dialog: false,
      showMenu: false,
      loading: true,
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
      search: '',
      editData: '',
      snack: false,
      snackColor: '',
      snackText: '',
      max10chars: v => v.length <= 10 || 'Input too long!',
      max20chars: v => v.length <= 20 || 'Input too long!',
      max50chars: v => v.length <= 50 || 'Input too long!',
      max100chars: v => v.length <= 100 || 'Input too long!',
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
      periodable: false,
      dropdown_period_default: { text: 'ALL', abbr: '-1'},
      dropdown_period: [
        { text: 'ALL', abbr: '-1' },
        { text: '1개월', abbr: '1M' },
        { text: '3개월', abbr: '3M' },
        { text: '6개월', abbr: '6M' },
        { text: '1년', abbr: '1Y' },
        { text: '기간설정', abbr: 'YYMMDD' }
      ],
      toggle_exclusive: 2,
      toggle_multiple: [1, 2, 3],
      date: null,
      menu: false,
      time: null,
      menu2: false,

      x: 0,
      y: 0,
      menuItems: ["create file", "create directory"],
    }),

    computed: {
      headers: function() {
        return this.$store.getters["buylist/header"];
      },
      desserts: function() {
        this.loading = false
        return this.$store.getters["buylist/buylist"];
      },
    },

    watch: {
      dialog (val) {
        val || this.close()
      },
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
          console.log('editedItem(', this.editedIndex, ') : ', this.editedItem)

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
        // console.log('handleClick: ', row.o_product_name)
        this.editedIndex = this.desserts.indexOf(row)
        this.editedItem = Object.assign({}, row)
        if( row.b_waybill_date.length > 10 ) {
          this.date = row.b_waybill_date.substring(0,10)
          this.time = row.b_waybill_date.substring(11,16)
          // console.log('b_waybill_date: ', row.b_waybill_date, ' : ', this.date, ' : ', this.time)
        } 
        this.dialog = true
      },

      handleMenu(event, item) {
        // set active row and deselect others
        // this.desserts.map((item, index) => {
        //     item.selected = item === row

        //     this.$set(this.desserts, index, item)
        // })

        // or just do something with your current clicked row item data
        // console.log('handleMenu: ', event, item)

        console.log('handleMenu: (', item.index, ') ', item.item.o_product_name)
        // this.editedIndex = this.desserts.indexOf(row)
        // this.editedItem = Object.assign({}, row)
        // if( row.b_waybill_date.length > 10 ) {
        //   this.date = row.b_waybill_date.substring(0,10)
        //   this.time = row.b_waybill_date.substring(11,16)
        //   // console.log('b_waybill_date: ', row.b_waybill_date, ' : ', this.date, ' : ', this.time)
        // } 
        this.showMenu = false;
        this.x = event.clientX
        this.y = event.clientY
        this.$nextTick(() => {
          this.showMenu = true;
        });
      },

      changeStatus(value) {
        console.log('changeStatus : ', value)
        // this.search = value
      },

      show(e) {
        e.preventDefault();
        this.showMenu = false;
        this.x = e.clientX;
        this.y = e.clientY;
        this.$nextTick(() => {
          this.showMenu = true;
        });
      },
    },
  }
</script>