<template>
  <div class="container">
    <template v-if="loading">
      <div class="skeletons">
        <div class="skeleton poster"></div>
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
    <div
      v-else
      class="movie-details">
      <div class="specs">
        <div class="title">
          {{ buyitem.o_product_name }}
        </div>
        <div class="브랜드">
          <span>{{ buyitem.p_brand }}</span>
        </div>
        <div class="주소">
          {{ buyitem.o_recv_addr }}
        </div>
        <div>
          <h3>주문번호</h3>
          {{ buyitem.b_waybill }}
        </div>
        <div>
          <h3>상태</h3>
          {{ buyitem.o_status }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import Loader from '~/components/Loader'
import '@grapecity/wijmo.vue2.barcode.common'

//_id : 23041056

export default {
  components: {
    Loader
  },
  async asyncData({ store, params }) {
    await store.dispatch('buylist/getBuylistWithId', {
      b_order_id: params.id
    })
    return {
      imageLoading: true
    }
  },
  computed: {
    ...mapState('buylist', [
      'loading',
      'buyitem'
    ])
  },
  methods: {
    // requestDiffSizeImage(url, size = 700) {
    //   // 잘못된 URL(Poster)인 경우.
    //   if (!url || url === 'N/A') {
    //     this.imageLoading = false
    //     return ''
    //   }
    //   const src = url.replace('SX300', `SX${size}`)
    //   // 정상적인 URL인 경우.
    //   this.$loadImage(src)
    //     .then(() => {
    //       this.imageLoading = false
    //     })
    //   return src
    // }
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
.movie-details {
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
