<template>
  <v-container style="max-width: 800px; position: relative;">
    <template v-if="loading">
      <div class="skeletons">
        <!-- <div class="skeleton poster"></div> -->
        <div class="specs">
          <div class="skeleton title"></div>
          <div class="skeleton spec"></div>
          <div class="skeleton plot"></div>
          <div class="skeleton etc"></div>
          <div class="skeleton etc"></div>
          <div class="skeleton etc"></div>
        </div>
      </div>
      <Loader
        :size="3"
        :z-index="9"
        fixed />
    </template>
    <template v-else
      class="maero-details">
      <!-- <div class="poster"></div> -->
      <div class="specs">
        <v-row justify="space-between">
          <v-col cols="12" sm="6" md="4">
            <span class="text-h15">{{buyitem.b_date}}</span>
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <span class="text-h15">임의번호</span>
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <span class="text-h15">{{buyitem.b_order_id}}</span>
          </v-col>
        </v-row>
        <v-row justify="space-between">
          <v-col cols="12" sm="6" md="4">
            <span class="text-h15">{{buyitem.o_name}}</span>
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <span class="text-h15">알림</span>
          </v-col>
        </v-row>
        <v-divider></v-divider>
        <v-row justify="space-between">
          <v-col cols="12" sm="6" md="4">
            <span class="text-h15">{{buyitem.o_product_name}}</span>
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <span class="text-h15">{{buyitem.p_brand}}</span>
          </v-col>
        </v-row>
        <v-row justify="space-between">
          <v-col cols="12" sm="6" md="4">
            <span class="text-h15">{{buyitem.o_color_size}}</span>
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <span class="text-h15">{{buyitem.o_amount}}</span>
          </v-col>
        </v-row>
        <v-row justify="center">
          <v-col cols="auto">
            <QRCanvas :options="options" />
          </v-col>
        </v-row>
        <v-divider></v-divider>
        <v-row justify="space-between">
          <v-col cols="12" sm="6" md="4">
            <span class="text-h15">{{buyitem.o_recv_name}}</span>
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <span class="text-h15">{{buyitem.o_recv_phone}}</span>
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <span class="text-h15">{{buyitem.o_recv_zip_code}}</span>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" sm="6" md="4">
            <span class="text-h15">{{buyitem.o_recv_addr}}</span>
          </v-col>
        </v-row>
        <v-row justify="space-between">
          <v-col cols="12" sm="6" md="4">
            <span class="text-h15">{{buyitem.b_memo}}</span>
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <span class="text-h15">{{buyitem.b_remarks}}</span>
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <span class="text-h15">{{buyitem.o_delivery_type}}</span>
          </v-col>
        </v-row>
      </div>
    </template>
  </v-container>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import Loader from '~/components/Loader'
import { QRCanvas } from 'qrcanvas-vue';

//_id : 23041056

export default {
  components: {
    Loader,
    QRCanvas
  },
  async asyncData({ store, params }) {
    await store.dispatch('buylist/getBuylistWithId', {
      b_order_id: params.id
    })
    return {
      imageLoading: true,
      options: {
        cellSize: 4,
        data: `https://mero-nuxt-demo.herokuapp.com/buyitem/${params.id}`,
      }
    }
  },
  computed: {
    ...mapState('buylist', [
      'loading',
      'buyitem'
    ])
  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>
.container {
  padding-top: 40px;
}
.skeletons {
  display: flex;
  .poster {
    flex-shrink: 0;
    width: 500px;
    height: 500px * 3/2;
    margin-right: 70px;
  }
  .specs {
    flex-grow: 1;
  }
  .skeleton {
    border-radius: 10px;
    background-color: $gray-200;
    &.title {
      width: 80%;
      height: 70px;
    }
    &.spec {
      width: 60%;
      height: 30px;
      margin-top: 20px;
    }
    &.plot {
      width: 100%;
      height: 250px;
      margin-top: 20px;
    }
    &.etc {
      width: 50%;
      height: 50px;
      margin-top: 20px;
    }
  }
}
.maero-details {
  display: flex;
  color: $gray-600;
  .poster {
    width: 500px;
    height: 500px * 3/2;
    margin-right: 70px;
    border-radius: 10px;
    background-color: $gray-200;
    background-size: cover;
    background-position: center;
    position: relative;
    flex-shrink: 0;
  }
  .specs {
    flex-grow: 1;
    .qr-canvas {
      width: 200px;
      height: 200px;
    }
    .title {
      color: $black;
      font-family: "Oswald", sans-serif;
      font-size: 70px;
      line-height: 1;
      margin-bottom: 30px;
    }
    .labels {
      color: $primary;
      span {
        &::after {
          content: "\00b7";
          margin: 0 6px;
        }
        &:last-child::after {
          display: none;
        }
      }
    }
    .plot {
      margin-top: 20px;
    }
    .ratings {
      .rating-wrap {
        display: flex;
        .rating {
          display: flex;
          align-items: center;
          margin-right: 32px;
          img {
            height: 30px;
            flex-shrink: 0;
            margin-right: 6px;
          }
        }
      }
    }
    h3 {
      margin: 24px 0 6px;
      color: $black;
      font-family: "Oswald", sans-serif;
      font-size: 20px;
    }
  }
  @include media-breakpoint-down(xl) {
    .poster {
      width: 300px;
      height: 300px * 3/2;
      margin-right: 40px;
    }
  }
  @include media-breakpoint-down(lg) {
    display: block;
    .poster {
      margin-bottom: 40px;
    }
  }
  @include media-breakpoint-down(md) {
    .specs {
      .qr-canvas {
          width: 100px;
          height: 100px;
      }
      .title {
        font-size: 50px;
      }
      .ratings {
        .rating-wrap {
          display: block;
          .rating {
            margin-top: 10px;
          }
        }
      }
    }
  }
}
</style>
