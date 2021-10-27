<template>
  <v-card>
    <v-card-title dense color='yellow'>
      주문목록
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>

      <v-container dense class="pa-0 ma-0">
        <v-file-input
          v-model="files"
          accept="text/csv"
          placeholder="Select your CSV file"
          label="File input"
          multiple
          prepend-icon="mdi-paperclip"
          @change="parsefile"
          hide-details
        >
          <template v-slot:selection="{ text }">
            <v-chip
              small
              label
              color="primary"
            >
              {{ text }}
            </v-chip>
          </template>
        </v-file-input>
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
      sort-by='product_id'
      class="elevation-1"

      style="display:block;white-space: nowrap;overflow-x:hidden;overflow-y:auto;text-overflow:ellipsis;"
    >
      <template v-slot:top>
        <v-toolbar
          flat
        >
          <v-toolbar-title>Orders</v-toolbar-title>
          <v-divider
            class="mx-4"
            inset
            vertical
          ></v-divider>
          <v-spacer></v-spacer>
          <v-dialog
            v-model="dialog"
            max-width="500px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                color="primary"
                dark
                class="mb-2"
                v-bind="attrs"
                v-on="on"
              >
                Add Order
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="text-h5">{{ formTitle }}</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col
                      cols="12"
                      sm="6"
                      md="4"
                    >
                      <v-text-field
                        v-model="editedItem.User"
                        label="User"
                      ></v-text-field>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                      md="4"
                    >
                      <v-text-field
                        v-model="editedItem.Password"
                        label="Password"
                      ></v-text-field>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                      md="4"
                    >
                      <v-text-field
                        v-model="editedItem.Level"
                        label="Level"
                      ></v-text-field>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                      md="4"
                    >
                      <v-text-field
                        v-model="editedItem.Phone"
                        label="Phone"
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
          <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
              <v-card-title class="text-h5">Are you sure you want to delete this item?</v-card-title>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
                <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-icon
          small
          class="mr-2"
          @click="editItem(item)"
        >
          mdi-pencil
        </v-icon>
        <v-icon
          small
          @click="deleteItem(item)"
        >
          mdi-delete
        </v-icon>
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
  </v-card>
</template>


<script>
import { mapState, mapGetters } from 'vuex'

  export default {
    components: {
      
    },
    data: () => ({
      dialog: false,
      dialogDelete: false,
      loading: true,
      editedIndex: -1,
      editedItem: {
        User: '',
        Password: '',
        Level: 1,
        Phone: '010',
      },
      defaultItem: {
        User: '',
        Password: '',
        Level: 1,
        Phone: '010',
      },
      search: '',
      files: [],
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
      },
      headers: function() {
        return this.$store.getters["orders/header"];
      },
      desserts: function() {
        this.loading = false
        return this.$store.getters["orders/orders"];
      },
    },

    watch: {
      dialog (val) {
        val || this.close()
      },
      dialogDelete (val) {
        val || this.closeDelete()
      }
    },

    created () {
      this.initialize()
    },

    methods: {
      initialize () {
        this.$store.dispatch('orders/getOrders')
      },

      editItem (item) {
        this.editedIndex = this.desserts.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        this.editedIndex = this.desserts.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialogDelete = true
      },

      deleteItemConfirm () {
        this.$store.dispatch('orders/setDelOrder', {
          row: this.editedIndex,
          item: this.editedItem
        })
        this.closeDelete()
      },

      close () {
        this.dialog = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      closeDelete () {
        this.dialogDelete = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      save () {
        if (this.editedIndex > -1) {
          this.$store.dispatch('orders/setUpdateOrder', {
            row: this.editedIndex,
            item: this.editedItem
          })
        } else {
          this.$store.dispatch('orders/setAddOrder', {
            item: this.editedItem
          })
        }
        this.close()
      },

      parsefile(files) {
        console.log('parsefile : ', files[0].name)
        var reader = new FileReader();
      
        // Use the javascript reader object to load the contents
        // of the file in the v-model prop
        var header = [
          'product_id',
          'product_name',
          'price',
          'amount',
          'order_id',
          'name',
          'recv_name',
          'recv_zip_code',
          'recv_addr',
          'recv_phone',
          'delivery_type',
          'color_size',
          'message',
          'en_name',
          'en_addr',
          'order_memo',
          'status'
        ]

        reader.readAsText(files[0]);
        reader.onload = () => {
          const input = reader.result
          // const lines = input.replace(/[^0-9,^,]/g, '').split('\n') 
          // const pattern = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/   // email pattern
          // replace(/(\s*)/g, '') : 필드에 들어간 모든 빈칸을 제거
          const lines = input.split('\n')
          // const output = lines.map(line => {
          const output = lines.slice(1).map(line => {
            const fields = line.replace(/[(")]/g, '').split(',')
            return Object.fromEntries(header.map( (h, i) => [h, fields[i]]))
          })

          console.log(output)
        }
      }
    },
  }
</script>