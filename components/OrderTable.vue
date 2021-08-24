<template>
  <v-app class="inner">
    <v-card
      class="overflow-auto"
      max-height="600"
      max-width="2000"
      justify="center"
      align="center"
    >
      <v-data-table
        :headers="orderheaders"
        :items="orderdesserts"
        class="[item.selected && 'selected']"
        @click:row="handleClick"
        @contextmenu:row="handleRightClick"
      >
        <template v-slot:item.name="props">
          <v-edit-dialog
            large 
            persistent 
            @save="saveName(props.item)"
            @open="editName = props.item.name"
          >
            {{ props.item.name }}
            <template v-slot:input>
              <v-text-field
                v-model="editName"
                :rules="[max25chars]"
                label="Edit"
                single-line
                counter
              ></v-text-field>
            </template>
          </v-edit-dialog>
        </template>
        <template v-slot:item.iron="props">
          <v-edit-dialog
            :return-value.sync="props.item.iron"
            large
            persistent
            @save="save"
            @cancel="cancel"
            @open="open"
            @close="close"
          >
            <div>{{ props.item.iron }}</div>
            <template v-slot:input>
              <div class="mt-4 text-h6">
                Update Iron
              </div>
              <v-text-field
                v-model="props.item.iron"
                :rules="[max25chars]"
                label="Edit"
                single-line
                counter
                autofocus
              ></v-text-field>
            </template>
          </v-edit-dialog>
        </template>
      </v-data-table>

      <v-snackbar
        v-model="snack"
        :timeout="3000"
        :color="snackColor"
      >
        {{ snackText }}

        <template v-slot:action="{ attrs }">
          <v-btn
            v-bind="attrs"
            text
            @click="snack = false"
          >
            Close
          </v-btn>
        </template>
      </v-snackbar>
    </v-card>
  </v-app>
</template>


<script>
import { mapState } from 'vuex'

  export default {
    // props: {
    //   headers: {
    //     type: Array,
    //     default: () => ({})
    //   },
    //   desserts: {
    //     type: Array,
    //     default: () => ({})
    //   },
    // },
    data () {
      return {
        editName: '',
        snack: false,
        snackColor: '',
        snackText: '',
        max25chars: v => v.length <= 25 || 'Input too long!',
        pagination: {},
      }
    },
    computed: {
    ...mapState('orders', [
      'orderheaders',
      'orderdesserts'
    ])
  },
    methods: {
      saveName(item) {
        console.log('saveName: ', item.name)
        this.$store.dispatch('orders/updateDessert', item)
        
        // console.log('saveName: ', this.editName)
        // item.name = this.editName
        this.save()
      },
      save () {
        this.snack = true
        this.snackColor = 'success'
        this.snackText = 'Data saved'
      },
      cancel () {
        this.snack = true
        this.snackColor = 'error'
        this.snackText = 'Canceled'
      },
      open () {
        this.snack = true
        this.snackColor = 'info'
        this.snackText = 'Dialog opened'
      },
      close () {
        console.log('Dialog closed')
      },
      handleClick(row) {
        // set active row and deselect others
        // this.desserts.map((item, index) => {
        //     item.selected = item === row

        //     this.$set(this.desserts, index, item)
        // })

        // or just do something with your current clicked row item data
        console.log('handleClick: ', row.name)
      },
      handleRightClick(row) {
      // set active row and deselect others
        // this.desserts.map((item, index) => {
        //     item.selected = item === row

        //     this.$set(this.desserts, index, item)
        // })

        // or just do something with your current clicked row item data
        console.log('rightClick:', row.name)
        
      },
    },
  }
</script>


<style lang="scss" scoped>
.inner {
  margin-top: 30px;
  padding: 10px 0;
  border-radius: 4px;
  text-align: center;
  &.no-result {
    padding: 70px 0;
  }
}
</style>
