import {Component, Input, OnInit} from '@angular/core';
import {CartContentService} from '../service/cartcontent/cart-content.service';
import {ProductDTO} from '../model/product/productDTO';
import {NavigationEnd, Router} from '@angular/router';
import {MatSnackBar} from "@angular/material/snack-bar";
import {FirebaseAuthService} from "../service/firebase/firebase.service";
import {Product} from "../model/product/product";
import {ProductService} from "../service/product/product.service";
import {CartService} from "../service/cart/cart.service";
import {CartContent} from "../model/cartcontent/cart-content";
import {CartDTO} from "../model/cart/cartDTO";

@Component({
  selector: 'app-sidecart',
  templateUrl: './sidecart.component.html',
  styleUrls: ['./sidecart.component.scss'],
})
export class SidecartComponent implements OnInit {
  @Input() getCartValue: boolean = false;
  @Input() searchValue: string = '';

  cartContents: CartContent[]
  products: ProductDTO[];
  priceSum: number = 0.0;
  currentPath: string = '';
  cartId: number;

  constructor(private cartContentService: CartContentService,
              private productService: ProductService,
              private router: Router,
              private snackBar: MatSnackBar,
              private cartService: CartService,
              public firebaseAuthService: FirebaseAuthService) {
  }

  ngOnInit() {
    this.cartId = 2
    this.productService.listProducts().subscribe(value => {
      this.products = value;
    });
    this.cartContentService.getCartContent().subscribe(cartContents => {
      this.cartContents = cartContents;
      if (this.products != undefined) {
        this.priceSum = 0.0;
        this.cartContents.forEach(cartContent => {
          let product = this.getProductById(cartContent.produktID)
          this.priceSum += product.preis * cartContent.anzahl
        })
      }
    })
    this.searchValue = '';
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.currentPath = event.url;
      }
    });
  }

  increaseProductCount(cartContent) {
    cartContent.anzahl++
    this.cartContentService.updateCartContent(cartContent)
  }

  reduceProductCount(cartContent) {
    cartContent.anzahl--
    if (cartContent.anzahl == 0) {
      this.cartContentService.deleteCartContent(cartContent.warenkorbinhaltID)
      return;
    }
    this.cartContentService.updateCartContent(cartContent)
  }


  getProductById(id: number): Product {
    if (this.products == undefined) {
      return undefined;
    }
    return this.products.find(product => product.produktID == id);
  }

  orderCart() {
    let userID = this.firebaseAuthService.getUserID()
    if (this.cartContents.length != 0) {
      //Cart aktualisieren
      this.cartService.updateCart(new CartDTO(this.cartId, userID, false))
      this.snackBar.open("Bestellung wurde aufgegeben", "OK",);
      console.log(this.getCartValue)
    } else {
      this.snackBar.open("Warenkorb ist leer", "OK",);
    }
  }
}

