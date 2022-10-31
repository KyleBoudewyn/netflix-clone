import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { db } from '../firsbase';
import './PlansScreen.css';
import { selectUser } from '../features/userSlice';
import { loadStripe } from '@stripe/stripe-js';

export default function PlansScreen() {
  const [products, setProducts] = useState([]);
  const [subscription, setSubscription] = useState(null);
  const user = useSelector(selectUser);

  useEffect(() => {
    db.collection('customers')
      .doc(user.uid)
      .collection('subscriptions')
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach(async (sub) => {
          setSubscription({
            role: sub.data().role,
            current_period_end: sub.data().current_period_end.seconds,
            current_period_start: sub.data().current_period_start.seconds,
          });
        });
      });
  }, [user.uid]);

  useEffect(() => {
    db.collection('products')
      .where('active', '==', true)
      .get()
      .then((querySnapshot) => {
        const products = {};
        querySnapshot.forEach(async (productDoc) => {
          products[productDoc.id] = productDoc.data();
          const priceSnap = await productDoc.ref.collection('prices').get();
          priceSnap.docs.forEach((price) => {
            products[productDoc.id].prices = {
              priceId: price.id,
              priceData: price.data(),
            };
          });
        });
        setProducts(products);
      });
  }, []);

  const loadCheckout = async (priceId) => {
    const docRef = await db
      .collection('customers')
      .doc(user.uid)
      .collection('checkout_sessions')
      .add({
        price: priceId,
        success_url: window.location.origin,
        cancel_url: window.location.origin,
      });
    docRef.onSnapshot(async (snap) => {
      const { error, sessionId } = snap.data();
      if (error) {
        alert(`An error occured: ${error.message}`);
      }
      console.log('api key is ', process.env.REACT_APP_STRIPE_API_KEY);
      if (sessionId) {
        const stripe = await loadStripe(process.env.REACT_APP_STRIPE_API_KEY);
        stripe.redirectToCheckout({ sessionId });
      }
    });
  };

  console.log(subscription);

  return (
    <div className="PlansScreen">
    <br/>
      {subscription && (
        <p>
          Renewal date: {new Date(subscription?.current_period_end *
          1000).toLocaleDateString()}
        </p>
      )}
      {Object.entries(products).map(([productId, productData]) => {
        const isCurrentPackage = productData.name
          ?.toLowerCase()
          .includes(subscription?.role.toLowerCase());
        return (
          <div
            className={`${
              isCurrentPackage && 'plansScreen_plan--disabled'
            } plansScreen_plan`}
            key={productId}
          >
            <div className="plansScreen_info">
              <h5>{productData.name}</h5>
              <h6>{productData.description}</h6>
            </div>
            <button
              onClick={() =>
                !isCurrentPackage && loadCheckout(productData.prices.priceId)
              }
            >
              {isCurrentPackage ? 'Current Package' : 'Subscribe'}
            </button>
          </div>
        );
      })}
    </div>
  );
}
