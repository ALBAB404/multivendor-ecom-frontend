
<script setup>
// All Import File  Code Is Here......................................................................................................
import { onMounted, ref } from 'vue';
import { useProduct, useCart, useNotification, useAuth, useWishlist, useModal  } from '@/stores'
import { storeToRefs } from 'pinia'; 
import { useRoute } from "vue-router"; 
import { ProductPrice } from "@/components/product";



// All Variable  Code Is Here.....................................................................................................
const product = useProduct()
const { singleProduct } = storeToRefs(product)
const route = useRoute();

const thumbnailImage = ref(null)
const activeImage = ref(null)

//MOdal from 
const modal = useModal();

const notify = useNotification();
const cart = useCart();
const { loading } = storeToRefs(cart);
const wishlist = useWishlist();
const auth = useAuth();


console.log(singleProduct);

// API Calling Code Is Here.....................................................................................................

onMounted(() => {
  productBySlug();
})

// All Function  Code Is Here.....................................................................................................


function addToCart(product) {
  cart.addToCart(product)
  notify.Success(`${product.name} Successfully Added Your Cart Item`);
}

const addToWishlist = async (product) => {
  if (auth.user.data) {
    let res = wishlist.addToWishlist(product);
    res.then((response) => {
      if (response.status === 200) {
        notify.Success(`${product.name} Removed Your Wishlist Items`);
        wishlist.loading = false;
      } else {
        notify.Success(
          `${product.name} Successfully Added Your Wishlist Items`
        );
        wishlist.loading = false;
      }
    });
  } else {
    modal.toggleModal()
  }
};

const changeImage = (img, index) => {
    thumbnailImage.value = img
    activeImage.value = index
}
const productBySlug = () => {
  var slug = route.params.slug;
  product.productBySlug(slug);
}
</script>

<template>
    <div>
        <section
          class="single-banner inner-section" v-if="singleProduct">
          <div class="container">
            <h2>{{ singleProduct.slug }}</h2>
            <ol class="breadcrumb"></ol>
          </div>
        </section>
        <section class="inner-section">
          <div class="container">
            <div class="row">
              <div class="col-lg-6">
                <div class="details-gallery">
                  <div class="details-label-group">
                    <label class="details-label new">{{ singleProduct.conditions }}</label
                    ><label class="details-label off">-{{ singleProduct.discount }}%</label>
                  </div>
                   <!-- card left -->
                    <div class = "product-imgs">
                      <div class = "img-display">
                        <div class = "img-showcase">
                          <img :src="$filters.makeImagePath(singleProduct.thumbnail)" alt = "shoe image" v-if="thumbnailImage == null">
                          <img :src="$filters.makeImagePath(thumbnailImage)" alt = "shoe image" v-else>
                        </div>
                      </div>
                      <div class = "img-select">
                        <div class = "img-item" v-for="(img, index) in singleProduct.images" :key="index" :class="[activeImage == index ? 'active-thumb' : '']">
                            <img :src="$filters.makeImagePath(img)" alt = "shoe image" @click.prevent="changeImage(img, index)">
                        </div>
                      </div>
                    </div>
                </div>
              </div>
              <div class="col-lg-6">
                <div class="details-content">
                  <h3 class="details-name"><a href="#">{{ singleProduct.name }}</a></h3>
                  <div class="details-meta"><!--v-if--><!--v-if--></div>
                  <div>
                    <!-- //jodi modal ba single product page theke data ase.. tahole h3 design  -->
                    <h3 class="view-price">
                      <ProductPrice :price="singleProduct.price" :discount="singleProduct.discount" />
                    </h3>
                  </div>
                  <p class="details-desc">
                    {{ $filters.textShort(singleProduct.descp, 200) }}
                  </p>
  
                  <div class="details-list-group">
                    <label class="details-list-title">Share:</label>
                    <ul class="details-share-list">
                      <li>
                        <a href="#" class="icofont-facebook" title="Facebook"></a>
                      </li>
                      <li>
                        <a href="#" class="icofont-twitter" title="Twitter"></a>
                      </li>
                      <li>
                        <a href="#" class="icofont-linkedin" title="Linkedin"></a>
                      </li>
                      <li>
                        <a
                          href="#"
                          class="icofont-instagram"
                          title="Instagram"
                        ></a>
                      </li>
                    </ul>
                  </div>
                  <div class="details-add-group">
                    <button class="product-add" title="Add to Cart" @click.prevent="addToCart(singleProduct)">
                      <i class="fas fa-shopping-basket"></i
                      ><span>add to cart</span>
                    </button>
                    <div class="product-action">
                      <button class="action-minus" title="Quantity Minus">
                        <i class="icofont-minus"></i></button
                      ><input
                        class="action-input"
                        title="Quantity Number"
                        type="text"
                        name="quantity"
                        value="1"
                      /><button class="action-plus" title="Quantity Plus">
                        <i class="icofont-plus"></i>
                      </button>
                    </div>
                  </div>
                  <div class="details-action-group">
                    <a
                      class="details-compare"
                      href="compare.html"
                      title="Compare This Item"
                      ><i class="fas fa-random"></i><span>Buy Now</span></a
                    ><a
                      @click.prevent="addToWishlist(singleProduct)"
                      class="details-wish wish"
                      href="#"
                      title="Add Your Wishlist"
                      ><i class="icofont-heart"></i><span>add to wish</span></a
                    >
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section class="inner-section">
          <div class="container">
            <div class="row">
              <div class="col-lg-12">
                <ul class="nav nav-tabs">
                  <li>
                    <a
                      href="#tab-desc"
                      class="tab-link active"
                      data-bs-toggle="tab"
                      >descriptions</a
                    >
                  </li>
                  <li>
                    <a href="#tab-spec" class="tab-link" data-bs-toggle="tab"
                      >Specifications</a
                    >
                  </li>
                  <li>
                    <a href="#tab-reve" class="tab-link" data-bs-toggle="tab"
                      >reviews (2)</a
                    >
                  </li>
                </ul>
              </div>
            </div>
            <div class="tab-pane fade show active" id="tab-desc">
              <div class="row">
                <div class="col-lg-12">
                  <div class="product-details-frame">
                    <div class="tab-descrip">
                    {{ singleProduct.descp }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="tab-pane fade" id="tab-spec">
              <div class="row">
                <div class="col-lg-12">
                  <div class="product-details-frame">
                    <table class="table table-bordered">
                      <tbody>
                        <tr>
                          <th scope="row">Product code</th>
                          <td>SKU: 101783</td>
                        </tr>
                        <tr>
                          <th scope="row">Weight</th>
                          <td>1kg, 2kg</td>
                        </tr>
                        <tr>
                          <th scope="row">Styles</th>
                          <td>@Girly</td>
                        </tr>
                        <tr>
                          <th scope="row">Properties</th>
                          <td>Short Dress</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            <div class="tab-pane fade" id="tab-reve">
              <div class="row">
                <div class="col-lg-12">
                  <div class="product-details-frame">
                    <ul class="review-list">
                      <li class="review-item">
                        <div class="review-media">
                          <a class="review-avatar" href="#"
                            ><img
                              src="/website/images/avatar/01.jpg"
                              alt="review"
                          /></a>
                          <h5 class="review-meta">
                            <a href="#">Sarjid Islam</a><span>June 02, 2022</span>
                          </h5>
                        </div>
                        <ul class="review-rating">
                          <li class="icofont-ui-rating"></li>
                          <li class="icofont-ui-rating"></li>
                          <li class="icofont-ui-rating"></li>
                          <li class="icofont-ui-rating"></li>
                          <li class="icofont-ui-rate-blank"></li>
                        </ul>
                        <p class="review-desc">
                          Lorem ipsum dolor sit amet consectetur adipisicing elit.
                          Ducimus hic amet qui velit, molestiae suscipit
                          perferendis, autem doloremque blanditiis dolores nulla
                          excepturi ea nobis!
                        </p>
                        <form class="review-reply">
                          <input
                            type="text"
                            placeholder="reply your thoughts"
                          /><button><i class="icofont-reply"></i>reply</button>
                        </form>
                        <ul class="review-reply-list">
                          <li class="review-reply-item">
                            <div class="review-media">
                              <a class="review-avatar" href="#"
                                ><img
                                  src="/website/images/avatar/02.jpg"
                                  alt="review"
                              /></a>
                              <h5 class="review-meta">
                                <a href="#">labonno khan</a
                                ><span><b>author -</b>June 02, 2020</span>
                              </h5>
                            </div>
                            <p class="review-desc">
                              Lorem ipsum dolor sit amet consectetur adipisicing
                              elit. Ducimus hic amet qui velit, molestiae suscipit
                              perferendis, autem doloremque blanditiis dolores
                              nulla excepturi ea nobis!
                            </p>
                            <form class="review-reply">
                              <input
                                type="text"
                                placeholder="reply your thoughts"
                              /><button>
                                <i class="icofont-reply"></i>reply
                              </button>
                            </form>
                          </li>
                          <li class="review-reply-item">
                            <div class="review-media">
                              <a class="review-avatar" href="#"
                                ><img
                                  src="/website/images/avatar/03.jpg"
                                  alt="review"
                              /></a>
                              <h5 class="review-meta">
                                <a href="#">tahmina bonny</a
                                ><span>June 02, 2020</span>
                              </h5>
                            </div>
                            <p class="review-desc">
                              Lorem ipsum dolor sit amet consectetur adipisicing
                              elit. Ducimus hic amet qui velit, molestiae suscipit
                              perferendis, autem doloremque blanditiis dolores
                              nulla excepturi ea nobis!
                            </p>
                            <form class="review-reply">
                              <input
                                type="text"
                                placeholder="reply your thoughts"
                              /><button>
                                <i class="icofont-reply"></i>reply
                              </button>
                            </form>
                          </li>
                        </ul>
                      </li>
                      <li class="review-item">
                        <div class="review-media">
                          <a class="review-avatar" href="#"
                            ><img
                              src="/website/images/avatar/04.jpg"
                              alt="review"
                          /></a>
                          <h5 class="review-meta">
                            <a href="#">shipu shikdar</a
                            ><span>June 02, 2020</span>
                          </h5>
                        </div>
                        <ul class="review-rating">
                          <li class="icofont-ui-rating"></li>
                          <li class="icofont-ui-rating"></li>
                          <li class="icofont-ui-rating"></li>
                          <li class="icofont-ui-rating"></li>
                          <li class="icofont-ui-rate-blank"></li>
                        </ul>
                        <p class="review-desc">
                          Lorem ipsum dolor sit amet consectetur adipisicing elit.
                          Ducimus hic amet qui velit, molestiae suscipit
                          perferendis, autem doloremque blanditiis dolores nulla
                          excepturi ea nobis!
                        </p>
                        <form class="review-reply">
                          <input
                            type="text"
                            placeholder="reply your thoughts"
                          /><button><i class="icofont-reply"></i>reply</button>
                        </form>
                      </li>
                    </ul>
                  </div>
                  <div class="product-details-frame">
                    <h3 class="frame-title">add your review</h3>
                    <form class="review-form">
                      <div class="row">
                        <div class="col-lg-12">
                          <div class="star-rating">
                            <input type="radio" name="rating" id="star-1" /><label
                              for="star-1"
                            ></label
                            ><input
                              type="radio"
                              name="rating"
                              id="star-2"
                            /><label for="star-2"></label
                            ><input
                              type="radio"
                              name="rating"
                              id="star-3"
                            /><label for="star-3"></label
                            ><input
                              type="radio"
                              name="rating"
                              id="star-4"
                            /><label for="star-4"></label
                            ><input
                              type="radio"
                              name="rating"
                              id="star-5"
                            /><label for="star-5"></label>
                          </div>
                        </div>
                        <div class="col-lg-12">
                          <div class="form-group">
                            <textarea
                              class="form-control"
                              placeholder="Describe"
                            ></textarea>
                          </div>
                        </div>
                        <div class="col-lg-6">
                          <div class="form-group">
                            <input
                              type="text"
                              class="form-control"
                              placeholder="Name"
                            />
                          </div>
                        </div>
                        <div class="col-lg-6">
                          <div class="form-group">
                            <input
                              type="email"
                              class="form-control"
                              placeholder="Email"
                            />
                          </div>
                        </div>
                        <div class="col-lg-12">
                          <button class="btn btn-inline">
                            <i class="icofont-water-drop"></i
                            ><span>drop your review</span>
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
</template>

<style scoped> 
    @import "@/assets/css/product-details.css";
    img{
    width: 100%;
    display: block;
}
.img-display{
    overflow: hidden;
}
.img-showcase{
    display: flex;
    width: 100%;
    transition: all 0.5s ease;
}
.img-showcase img{
    min-width: 100%;
}
.img-select{
    display: flex;
}
.img-item{
    margin: 0.3rem;
}
.img-item:nth-child(1),
.img-item:nth-child(2),
.img-item:nth-child(3){
    margin-right: 0;
}
.img-item:hover{
    opacity: 0.8;
}

.active-thumb{
  border: 2px solid #119744;
}
</style>