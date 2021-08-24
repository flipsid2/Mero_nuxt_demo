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
        :headers="headers"
        :items="desserts"
        class="[item.selected && 'selected']"
        @click:row="handleClick"
        @contextmenu:row="handleRightClick"
      >
        <template v-slot:item.name="props">
          <v-edit-dialog
            :return-value.sync="props.item.name"
            @save="save"
            @cancel="cancel"
            @open="open"
            @close="close"
          >
            {{ props.item.name }}
            <template v-slot:input>
              <v-text-field
                v-model="props.item.name"
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
  export default {
    // props: {
    //   headers: {
    //     type: Object,
    //     default: () => ({})
    //   },
    //   items: {
    //     type: Object,
    //     default: () => ({})
    //   }s
    // },
    data () {
      return {
        snack: false,
        snackColor: '',
        snackText: '',
        max25chars: v => v.length <= 25 || 'Input too long!',
        pagination: {},
        headers: [
          {
            text: 'Dessert (100g serving)',
            align: 'start',
            sortable: false,
            value: 'name',
          },
          { text: 'Calories', value: 'calories' },
          { text: 'Fat (g)', value: 'fat' },
          { text: 'Carbs (g)', value: 'carbs' },
          { text: 'Protein (g)', value: 'protein' },
          { text: 'Iron (%)', value: 'iron' },
          { text: 'Calories2', value: 'calories2' },
          { text: 'Fat (g)2', value: 'fat2' },
          { text: 'Carbs (g)2', value: 'carbs2' },
          { text: 'Protein (g)2', value: 'protein2' },
          { text: 'Iron (%)2', value: 'iron2' },
          { text: 'Calories3', value: 'calories3' },
          { text: 'Fat (g)3', value: 'fat3' },
          { text: 'Carbs (g)3', value: 'carbs3' },
          { text: 'Protein (g)3', value: 'protein3' },
          { text: 'Iron (%)3', value: 'iron3' },
        ],
        desserts: [
          {
            name: 'Frozen Yogurt',
            calories: 159,
            fat: 6.0,
            carbs: 24,
            protein: 4.0,
            iron: '1%',
            calories2: 159,
            fat2: 6.0,
            carbs2: 24,
            protein2: 4.0,
            iron2: '1%',
            calories3: 159,
            fat3: 6.0,
            carbs3: 24,
            protein3: 4.0,
            iron3: '1%',
          },
          {
            name: 'Ice cream sandwich',
            calories: 237,
            fat: 9.0,
            carbs: 37,
            protein: 4.3,
            iron: '1%',
            calories2: 159,
            fat2: 6.0,
            carbs2: 24,
            protein2: 4.0,
            iron2: '1%',
          },
          {
            name: 'Eclair',
            calories: 262,
            fat: 16.0,
            carbs: 23,
            protein: 6.0,
            iron: '7%',
            calories2: 159,
            fat2: 6.0,
            carbs2: 24,
            protein2: 4.0,
            iron2: '1%',
          },
          {
            name: 'Cupcake',
            calories: 305,
            fat: 3.7,
            carbs: 67,
            protein: 4.3,
            iron: '8%',
            calories2: 159,
            fat2: 6.0,
            carbs2: 24,
            protein2: 4.0,
            iron2: '1%',
          },
          {
            name: 'Gingerbread',
            calories: 356,
            fat: 16.0,
            carbs: 49,
            protein: 3.9,
            iron: '16%',
            calories2: 159,
            fat2: 6.0,
            carbs2: 24,
            protein2: 4.0,
            iron2: '1%',
          },
          {
            name: 'Jelly bean',
            calories: 375,
            fat: 0.0,
            carbs: 94,
            protein: 0.0,
            iron: '0%',
            calories2: 159,
            fat2: 6.0,
            carbs2: 24,
            protein2: 4.0,
            iron2: '1%',
          },
          {
            name: 'Lollipop',
            calories: 392,
            fat: 0.2,
            carbs: 98,
            protein: 0,
            iron: '2%',
            calories2: 159,
            fat2: 6.0,
            carbs2: 24,
            protein2: 4.0,
            iron2: '1%',
          },
          {
            name: 'Honeycomb',
            calories: 408,
            fat: 3.2,
            carbs: 87,
            protein: 6.5,
            iron: '45%',
            calories2: 159,
            fat2: 6.0,
            carbs2: 24,
            protein2: 4.0,
            iron2: '1%',
          },
          {
            name: 'Donut',
            calories: 452,
            fat: 25.0,
            carbs: 51,
            protein: 4.9,
            iron: '22%',
            calories2: 159,
            fat2: 6.0,
            carbs2: 24,
            protein2: 4.0,
            iron2: '1%',
          },
          {
            name: 'KitKat',
            calories: 518,
            fat: 26.0,
            carbs: 65,
            protein: 7,
            iron: '6%',
            calories2: 159,
            fat2: 6.0,
            carbs2: 24,
            protein2: 4.0,
            iron2: '1%',
          },
        ],
      }
    },
    methods: {
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
        this.desserts.map((item, index) => {
            item.selected = item === row

            this.$set(this.desserts, index, item)
        })

        // or just do something with your current clicked row item data
        console.log('handleClick: ', row.name)
      },
      handleRightClick(row) {
      // set active row and deselect others
        this.desserts.map((item, index) => {
            item.selected = item === row

            this.$set(this.desserts, index, item)
        })

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
