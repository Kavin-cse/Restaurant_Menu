import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import { MatStepperModule } from '@angular/material/stepper';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDividerModule } from '@angular/material/divider';
import { CartService } from '../../services/cart.service';
import { OrderService } from '../../services/order.service';
import { Customer, PaymentInfo } from '../../models/models';

@Component({
  selector: 'app-order-form',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule, FormsModule, RouterLink,
    MatButtonModule, MatIconModule, MatInputModule, MatFormFieldModule,
    MatRadioModule, MatStepperModule, MatSnackBarModule, MatDividerModule
  ],
  template: `
    <div class="checkout-page">
      <!-- Empty Cart Guard -->
      <div class="empty-redirect" *ngIf="cartService.isEmpty()">
        <div class="empty-icon">🛒</div>
        <h2>Your cart is empty</h2>
        <p>Add some delicious dishes before checkout!</p>
        <a routerLink="/menu" mat-raised-button class="menu-btn">
          <mat-icon>restaurant_menu</mat-icon> Go to Menu
        </a>
      </div>

      <div class="checkout-content" *ngIf="!cartService.isEmpty()">
        <div class="checkout-header">
          <h1>Checkout</h1>
          <a routerLink="/cart" class="back-link">
            <mat-icon>arrow_back</mat-icon> Back to Cart
          </a>
        </div>

        <div class="checkout-grid">
          <!-- Left: Forms -->
          <div class="forms-section">
            <mat-stepper [linear]="true" #stepper orientation="vertical" class="checkout-stepper">

              <!-- Step 1: Customer Details -->
              <mat-step [stepControl]="customerForm" label="Delivery Information">
                <form [formGroup]="customerForm" class="step-form">
                  <div class="form-row">
                    <mat-form-field appearance="outline" class="full-width">
                      <mat-label>Full Name</mat-label>
                      <input matInput formControlName="name" placeholder="John Doe" id="customer-name">
                      <mat-icon matSuffix>person</mat-icon>
                      <mat-error *ngIf="customerForm.get('name')?.hasError('required')">Name is required</mat-error>
                      <mat-error *ngIf="customerForm.get('name')?.hasError('minlength')">At least 3 characters</mat-error>
                    </mat-form-field>
                  </div>

                  <div class="form-row two-cols">
                    <mat-form-field appearance="outline">
                      <mat-label>Email</mat-label>
                      <input matInput formControlName="email" placeholder="you@example.com" type="email" id="customer-email">
                      <mat-icon matSuffix>email</mat-icon>
                      <mat-error *ngIf="customerForm.get('email')?.hasError('required')">Email is required</mat-error>
                      <mat-error *ngIf="customerForm.get('email')?.hasError('email')">Invalid email format</mat-error>
                    </mat-form-field>

                    <mat-form-field appearance="outline">
                      <mat-label>Phone Number</mat-label>
                      <input matInput formControlName="phone" placeholder="9876543210" id="customer-phone">
                      <mat-icon matSuffix>phone</mat-icon>
                      <mat-error *ngIf="customerForm.get('phone')?.hasError('required')">Phone is required</mat-error>
                      <mat-error *ngIf="customerForm.get('phone')?.hasError('pattern')">Enter a valid 10-digit number</mat-error>
                    </mat-form-field>
                  </div>

                  <div class="form-row">
                    <mat-form-field appearance="outline" class="full-width">
                      <mat-label>Delivery Address</mat-label>
                      <textarea matInput formControlName="address" placeholder="House No., Street, Area" rows="2" id="customer-address"></textarea>
                      <mat-icon matSuffix>home</mat-icon>
                      <mat-error *ngIf="customerForm.get('address')?.hasError('required')">Address is required</mat-error>
                    </mat-form-field>
                  </div>

                  <div class="form-row two-cols">
                    <mat-form-field appearance="outline">
                      <mat-label>City</mat-label>
                      <input matInput formControlName="city" placeholder="Chennai" id="customer-city">
                      <mat-error *ngIf="customerForm.get('city')?.hasError('required')">City is required</mat-error>
                    </mat-form-field>

                    <mat-form-field appearance="outline">
                      <mat-label>PIN Code</mat-label>
                      <input matInput formControlName="pincode" placeholder="600001" id="customer-pincode">
                      <mat-error *ngIf="customerForm.get('pincode')?.hasError('required')">PIN is required</mat-error>
                      <mat-error *ngIf="customerForm.get('pincode')?.hasError('pattern')">Enter valid 6-digit PIN</mat-error>
                    </mat-form-field>
                  </div>

                  <div class="step-actions">
                    <button mat-raised-button class="next-btn" matStepperNext
                      [disabled]="customerForm.invalid" id="step1-next">
                      Continue to Payment <mat-icon>arrow_forward</mat-icon>
                    </button>
                  </div>
                </form>
              </mat-step>

              <!-- Step 2: Payment -->
              <mat-step [stepControl]="paymentForm" label="Payment Method">
                <form [formGroup]="paymentForm" class="step-form">
                  <div class="payment-methods">
                    <label class="payment-card" [class.selected]="paymentMethod === 'card'"
                      (click)="setPaymentMethod('card')">
                      <input type="radio" value="card" [(ngModel)]="paymentMethod" [ngModelOptions]="{standalone: true}"
                        name="paymentMethod" id="pay-card">
                      <div class="payment-card-inner">
                        <mat-icon>credit_card</mat-icon>
                        <span>Credit / Debit Card</span>
                      </div>
                    </label>

                    <label class="payment-card" [class.selected]="paymentMethod === 'upi'"
                      (click)="setPaymentMethod('upi')">
                      <input type="radio" value="upi" [(ngModel)]="paymentMethod" [ngModelOptions]="{standalone: true}"
                        name="paymentMethod" id="pay-upi">
                      <div class="payment-card-inner">
                        <mat-icon>account_balance_wallet</mat-icon>
                        <span>UPI</span>
                      </div>
                    </label>

                    <label class="payment-card" [class.selected]="paymentMethod === 'cash'"
                      (click)="setPaymentMethod('cash')">
                      <input type="radio" value="cash" [(ngModel)]="paymentMethod" [ngModelOptions]="{standalone: true}"
                        name="paymentMethod" id="pay-cash">
                      <div class="payment-card-inner">
                        <mat-icon>payments</mat-icon>
                        <span>Cash on Delivery</span>
                      </div>
                    </label>
                  </div>

                  <!-- Card Details -->
                  <div class="card-fields" *ngIf="paymentMethod === 'card'">
                    <mat-form-field appearance="outline" class="full-width">
                      <mat-label>Card Number</mat-label>
                      <input matInput formControlName="cardNumber" placeholder="1234 5678 9012 3456"
                        maxlength="16" id="card-number">
                      <mat-icon matSuffix>credit_card</mat-icon>
                      <mat-error *ngIf="paymentForm.get('cardNumber')?.hasError('required')">Card number required</mat-error>
                      <mat-error *ngIf="paymentForm.get('cardNumber')?.hasError('pattern')">Enter valid 16-digit card number</mat-error>
                    </mat-form-field>

                    <div class="two-cols">
                      <mat-form-field appearance="outline">
                        <mat-label>Expiry (MM/YY)</mat-label>
                        <input matInput formControlName="cardExpiry" placeholder="12/26" maxlength="5" id="card-expiry">
                        <mat-error *ngIf="paymentForm.get('cardExpiry')?.hasError('required')">Expiry required</mat-error>
                        <mat-error *ngIf="paymentForm.get('cardExpiry')?.hasError('pattern')">Format: MM/YY</mat-error>
                      </mat-form-field>

                      <mat-form-field appearance="outline">
                        <mat-label>CVV</mat-label>
                        <input matInput formControlName="cardCvv" placeholder="123" maxlength="3" type="password" id="card-cvv">
                        <mat-error *ngIf="paymentForm.get('cardCvv')?.hasError('required')">CVV required</mat-error>
                        <mat-error *ngIf="paymentForm.get('cardCvv')?.hasError('pattern')">3-digit CVV</mat-error>
                      </mat-form-field>
                    </div>
                  </div>

                  <!-- UPI ID -->
                  <div class="upi-fields" *ngIf="paymentMethod === 'upi'">
                    <mat-form-field appearance="outline" class="full-width">
                      <mat-label>UPI ID</mat-label>
                      <input matInput formControlName="upiId" placeholder="yourname@upi" id="upi-id">
                      <mat-icon matSuffix>account_balance_wallet</mat-icon>
                      <mat-error *ngIf="paymentForm.get('upiId')?.hasError('required')">UPI ID required</mat-error>
                      <mat-error *ngIf="paymentForm.get('upiId')?.hasError('pattern')">Invalid UPI ID format</mat-error>
                    </mat-form-field>
                  </div>

                  <!-- Special Instructions -->
                  <mat-form-field appearance="outline" class="full-width">
                    <mat-label>Special Instructions (optional)</mat-label>
                    <textarea matInput [(ngModel)]="specialInstructions" [ngModelOptions]="{standalone: true}"
                      placeholder="Allergies, spice level, delivery notes..." rows="2" id="special-instructions"></textarea>
                    <mat-icon matSuffix>notes</mat-icon>
                  </mat-form-field>

                  <div class="step-actions">
                    <button mat-stroked-button matStepperPrevious class="back-btn-step">
                      <mat-icon>arrow_back</mat-icon> Back
                    </button>
                    <button mat-raised-button class="place-order-btn"
                      [disabled]="!isPaymentValid() || isPlacingOrder"
                      (click)="placeOrder()" id="place-order-btn">
                      <mat-icon *ngIf="!isPlacingOrder">check_circle</mat-icon>
                      <span *ngIf="!isPlacingOrder">Place Order · ₹{{ cartService.total() | number:'1.0-2' }}</span>
                      <span *ngIf="isPlacingOrder">Processing...</span>
                    </button>
                  </div>
                </form>
              </mat-step>
            </mat-stepper>
          </div>

          <!-- Right: Order Summary -->
          <div class="summary-panel">
            <h2>Order Summary</h2>

            <div class="summary-items">
              <div *ngFor="let ci of cartService.items()" class="summary-item">
                <img [src]="ci.menuItem.image" [alt]="ci.menuItem.name" class="summary-img">
                <div class="summary-item-info">
                  <div class="summary-item-name">{{ ci.menuItem.name }}</div>
                  <div class="summary-item-qty">× {{ ci.quantity }}</div>
                </div>
                <div class="summary-item-price">
                  ₹{{ (ci.menuItem.price * (1 - (ci.menuItem.discount || 0)/100) * ci.quantity) | number:'1.0-0' }}
                </div>
              </div>
            </div>

            <mat-divider class="divider"></mat-divider>

            <div class="summary-totals">
              <div class="summary-row">
                <span>Subtotal</span>
                <span>₹{{ cartService.subtotal() | number:'1.0-2' }}</span>
              </div>
              <div class="summary-row">
                <span>GST (5%)</span>
                <span>₹{{ cartService.tax() | number:'1.0-2' }}</span>
              </div>
              <div class="summary-row">
                <span>Delivery</span>
                <span class="free-tag">FREE</span>
              </div>
            </div>

            <mat-divider class="divider"></mat-divider>

            <div class="grand-total">
              <span>Grand Total</span>
              <span class="grand-amount">₹{{ cartService.total() | number:'1.0-2' }}</span>
            </div>

            <!-- Guarantee badges -->
            <div class="guarantees">
              <div class="guarantee">
                <mat-icon>verified</mat-icon>
                <span>Secure Checkout</span>
              </div>
              <div class="guarantee">
                <mat-icon>local_shipping</mat-icon>
                <span>Free Delivery</span>
              </div>
              <div class="guarantee">
                <mat-icon>restaurant</mat-icon>
                <span>Fresh & Hot</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .checkout-page {
      min-height: 100vh;
      background: #0f0e17;
      padding: 100px 24px 60px;
    }

    /* Empty state */
    .empty-redirect {
      text-align: center;
      padding: 80px 20px;
      color: rgba(255,255,255,0.6);

      .empty-icon { font-size: 5rem; margin-bottom: 20px; }
      h2 { font-family: 'Playfair Display', serif; color: #fff; font-size: 1.8rem; margin-bottom: 12px; }
      p { margin-bottom: 32px; }
    }

    .menu-btn {
      background: linear-gradient(135deg, #f5a623, #e67e22) !important;
      color: white !important;
      border-radius: 50px !important;
      padding: 12px 28px !important;
    }

    /* Checkout Layout */
    .checkout-content {
      max-width: 1200px;
      margin: 0 auto;
    }

    .checkout-header {
      display: flex;
      align-items: baseline;
      justify-content: space-between;
      margin-bottom: 36px;
      flex-wrap: wrap;
      gap: 12px;
    }

    h1 {
      font-family: 'Playfair Display', serif;
      font-size: 2.5rem;
      color: #fff;
      margin: 0;
    }

    .back-link {
      display: flex;
      align-items: center;
      gap: 6px;
      color: rgba(255,255,255,0.5);
      text-decoration: none;
      font-size: 0.9rem;
      transition: color 0.2s;

      mat-icon { font-size: 1rem; }
      &:hover { color: #f5a623; }
    }

    .checkout-grid {
      display: grid;
      grid-template-columns: 1fr 380px;
      gap: 32px;
      align-items: start;
    }

    /* Stepper Overrides */
    .checkout-stepper {
      background: transparent !important;
    }

    ::ng-deep .checkout-stepper .mat-step-header {
      background: rgba(255,255,255,0.03) !important;
      border-radius: 12px !important;
    }

    ::ng-deep .checkout-stepper .mat-step-label {
      color: rgba(255,255,255,0.7) !important;
    }

    ::ng-deep .checkout-stepper .mat-step-label-active {
      color: #f5a623 !important;
    }

    ::ng-deep .checkout-stepper .mat-vertical-content-container {
      border-left: 1px solid rgba(255,255,255,0.08) !important;
    }

    ::ng-deep .checkout-stepper .mat-stepper-vertical-line::before {
      border-left-color: rgba(255,255,255,0.15) !important;
    }

    ::ng-deep .mat-step-icon-selected {
      background-color: #f5a623 !important;
    }

    ::ng-deep .mat-step-icon-state-done {
      background-color: #4caf50 !important;
    }

    /* Step Form */
    .step-form {
      padding: 20px 0 8px;
    }

    .form-row { margin-bottom: 4px; }

    .two-cols {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 16px;
    }

    .full-width { width: 100%; }

    /* Material form overrides for dark theme */
    ::ng-deep .step-form .mat-mdc-text-field-wrapper {
      background: rgba(255,255,255,0.04) !important;
    }

    ::ng-deep .step-form .mat-mdc-form-field-outline-start,
    ::ng-deep .step-form .mat-mdc-form-field-outline-end,
    ::ng-deep .step-form .mat-mdc-form-field-outline-notch {
      border-color: rgba(255,255,255,0.12) !important;
    }

    ::ng-deep .step-form .mat-mdc-form-field-outline-start:focus-within,
    ::ng-deep .step-form .mat-mdc-input-element:focus ~ .mdc-notched-outline .mdc-notched-outline__leading {
      border-color: #f5a623 !important;
    }

    ::ng-deep .step-form input.mat-mdc-input-element,
    ::ng-deep .step-form textarea.mat-mdc-input-element {
      color: #fff !important;
    }

    ::ng-deep .step-form .mat-mdc-floating-label,
    ::ng-deep .step-form .mdc-floating-label {
      color: rgba(255,255,255,0.5) !important;
    }

    ::ng-deep .step-form mat-icon[matSuffix] {
      color: rgba(255,255,255,0.4) !important;
    }

    /* Payment Cards */
    .payment-methods {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 12px;
      margin-bottom: 20px;
    }

    .payment-card {
      cursor: pointer;

      input[type="radio"] { display: none; }
    }

    .payment-card-inner {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 8px;
      padding: 16px 12px;
      border: 2px solid rgba(255,255,255,0.1);
      border-radius: 14px;
      background: rgba(255,255,255,0.03);
      color: rgba(255,255,255,0.6);
      font-size: 0.85rem;
      transition: all 0.2s;

      mat-icon { color: rgba(255,255,255,0.4); font-size: 1.5rem; }
    }

    .payment-card.selected .payment-card-inner {
      border-color: #f5a623;
      background: rgba(245,166,35,0.1);
      color: #f5a623;

      mat-icon { color: #f5a623; }
    }

    .card-fields, .upi-fields {
      display: flex;
      flex-direction: column;
      gap: 4px;
      margin-bottom: 16px;
    }

    /* Step Actions */
    .step-actions {
      display: flex;
      gap: 12px;
      align-items: center;
      margin-top: 16px;
    }

    .next-btn, .place-order-btn {
      background: linear-gradient(135deg, #f5a623, #e67e22) !important;
      color: white !important;
      border-radius: 50px !important;
      padding: 10px 28px !important;
      font-size: 0.95rem !important;
      font-weight: 600 !important;
      box-shadow: 0 6px 20px rgba(245,166,35,0.3) !important;
      display: flex !important;
      align-items: center !important;
      gap: 8px !important;

      &:disabled {
        background: rgba(255,255,255,0.1) !important;
        color: rgba(255,255,255,0.3) !important;
        box-shadow: none !important;
      }
    }

    .back-btn-step {
      border-color: rgba(255,255,255,0.2) !important;
      color: rgba(255,255,255,0.6) !important;
      border-radius: 50px !important;
      display: flex !important;
      align-items: center !important;
      gap: 6px !important;
    }

    /* Summary Panel */
    .summary-panel {
      background: linear-gradient(145deg, #1a1a2e, #16213e);
      border: 1px solid rgba(255,255,255,0.08);
      border-radius: 20px;
      padding: 24px;
      position: sticky;
      top: 90px;

      h2 {
        font-family: 'Playfair Display', serif;
        color: #fff;
        margin: 0 0 20px;
        font-size: 1.3rem;
      }
    }

    .summary-items {
      display: flex;
      flex-direction: column;
      gap: 12px;
      margin-bottom: 16px;
    }

    .summary-item {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .summary-img {
      width: 50px;
      height: 50px;
      border-radius: 8px;
      object-fit: cover;
      flex-shrink: 0;
    }

    .summary-item-info { flex: 1; }
    .summary-item-name { color: rgba(255,255,255,0.8); font-size: 0.85rem; font-weight: 500; }
    .summary-item-qty { color: rgba(255,255,255,0.4); font-size: 0.78rem; }
    .summary-item-price { color: #f5a623; font-weight: 600; font-size: 0.9rem; flex-shrink: 0; }

    .divider { border-color: rgba(255,255,255,0.08) !important; margin: 16px 0 !important; }

    .summary-totals {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .summary-row {
      display: flex;
      justify-content: space-between;
      color: rgba(255,255,255,0.55);
      font-size: 0.88rem;
    }

    .free-tag { color: #4caf50; font-weight: 600; }

    .grand-total {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: 4px 0;
    }

    .grand-total span:first-child { font-size: 1rem; font-weight: 600; color: #fff; }
    .grand-amount { font-size: 1.6rem; font-weight: 800; color: #f5a623; }

    /* Guarantees */
    .guarantees {
      margin-top: 20px;
      display: flex;
      flex-direction: column;
      gap: 10px;
      border-top: 1px solid rgba(255,255,255,0.06);
      padding-top: 20px;
    }

    .guarantee {
      display: flex;
      align-items: center;
      gap: 10px;
      color: rgba(255,255,255,0.45);
      font-size: 0.82rem;

      mat-icon { color: #4caf50; font-size: 1.1rem; }
    }

    @media (max-width: 900px) {
      .checkout-grid { grid-template-columns: 1fr; }
      .summary-panel { position: static; order: -1; }
      .payment-methods { grid-template-columns: 1fr 1fr; }
    }

    @media (max-width: 600px) {
      .two-cols { grid-template-columns: 1fr; }
      .payment-methods { grid-template-columns: 1fr; }
    }
  `]
})
export class OrderFormComponent implements OnInit {
  customerForm!: FormGroup;
  paymentForm!: FormGroup;
  paymentMethod: 'card' | 'upi' | 'cash' = 'card';
  specialInstructions = '';
  isPlacingOrder = false;

  constructor(
    private fb: FormBuilder,
    public cartService: CartService,
    private orderService: OrderService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.customerForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^[6-9]\d{9}$/)]],
      address: ['', Validators.required],
      city: ['', Validators.required],
      pincode: ['', [Validators.required, Validators.pattern(/^\d{6}$/)]]
    });

    this.paymentForm = this.fb.group({
      cardNumber: [''],
      cardExpiry: [''],
      cardCvv: [''],
      upiId: ['']
    });

    this.setPaymentMethod('card');
  }

  setPaymentMethod(method: 'card' | 'upi' | 'cash'): void {
    this.paymentMethod = method;

    // Reset and update validators based on payment method
    this.paymentForm.clearValidators();
    this.paymentForm.get('cardNumber')?.clearValidators();
    this.paymentForm.get('cardExpiry')?.clearValidators();
    this.paymentForm.get('cardCvv')?.clearValidators();
    this.paymentForm.get('upiId')?.clearValidators();

    if (method === 'card') {
      this.paymentForm.get('cardNumber')?.setValidators([Validators.required, Validators.pattern(/^\d{16}$/)]);
      this.paymentForm.get('cardExpiry')?.setValidators([Validators.required, Validators.pattern(/^\d{2}\/\d{2}$/)]);
      this.paymentForm.get('cardCvv')?.setValidators([Validators.required, Validators.pattern(/^\d{3}$/)]);
    } else if (method === 'upi') {
      this.paymentForm.get('upiId')?.setValidators([Validators.required, Validators.pattern(/^[\w.\-]+@[\w.]+$/)]);
    }

    this.paymentForm.get('cardNumber')?.updateValueAndValidity();
    this.paymentForm.get('cardExpiry')?.updateValueAndValidity();
    this.paymentForm.get('cardCvv')?.updateValueAndValidity();
    this.paymentForm.get('upiId')?.updateValueAndValidity();
  }

  isPaymentValid(): boolean {
    if (this.paymentMethod === 'cash') return true;
    return this.paymentForm.valid;
  }

  placeOrder(): void {
    if (this.customerForm.invalid || !this.isPaymentValid()) return;

    this.isPlacingOrder = true;

    const customer: Customer = this.customerForm.value;
    const payment: PaymentInfo = {
      method: this.paymentMethod,
      ...(this.paymentMethod === 'card' ? {
        cardNumber: this.paymentForm.value.cardNumber,
        cardExpiry: this.paymentForm.value.cardExpiry,
        cardCvv: this.paymentForm.value.cardCvv
      } : {}),
      ...(this.paymentMethod === 'upi' ? { upiId: this.paymentForm.value.upiId } : {})
    };

    // Simulate async processing
    setTimeout(() => {
      const order = this.orderService.placeOrder(customer, payment, this.specialInstructions);
      this.isPlacingOrder = false;
      this.router.navigate(['/order-confirmation']);
    }, 1500);
  }
}
