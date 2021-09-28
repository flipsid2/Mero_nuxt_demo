<template>
  <v-app>
    <v-data-table
      :headers=headers
      :items=desserts
      :footer-props="{'items-per-page-options':[-1]}"
      hide-default-footer
      :loading="loading"
      loading-text="Loading... Please wait"
      sort-by='b_date'
      class="elevation-1"
      @click:row="handleClick"
    >
      <!-- <template v-slot:item.b_date="props">
        <v-edit-dialog
          large 
          persistent 
          @save="saveData(props.item, 'b_date')"
          @open="editData = props.item.b_date"
        >
          {{ props.item.b_date }}
          <template v-slot:input>
            <v-text-field
              v-model="editData"
              :rules="[max10chars]"
              label="Edit"
              single-line
              counter
            ></v-text-field>
          </template>
        </v-edit-dialog>
      </template> -->

      <template v-slot:top>
        <v-toolbar
          flat
        >
          <v-toolbar-title>매입정보</v-toolbar-title>
          <v-divider
            class="mx-4"
            inset
            vertical
          ></v-divider>
          <v-spacer></v-spacer>
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
                        v-model="editedItem.b_waybill_date" label="매입일"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.b_memo" label="memo"
                      ></v-text-field>
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
        </v-toolbar>
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

      editData: '',
      snack: false,
      snackColor: '',
      snackText: '',
      max10chars: v => v.length <= 10 || 'Input too long!',
      max20chars: v => v.length <= 20 || 'Input too long!',
      max50chars: v => v.length <= 50 || 'Input too long!',
      max100chars: v => v.length <= 100 || 'Input too long!',
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
        this.dialog = true
      },
    },
  }
</script>