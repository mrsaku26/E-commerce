import React from 'react';

const styles = {
  desc: {
    margin: '90px 170px',
  },
  descBtn: {
    display: 'flex',
    flexDirection: 'column',
  },
  descc: {
    display: 'flex',
  },
  button: {
    outline: 'none',
    border: '1px solid #d0d0d0',
    width: '173px',
    height: '72px',
    background: 'white',
    fontSize: '16px',
    fontWeight: '600',
  },
  description: {
    color: '#000000',
  },
  reviews: {
    color: '#555555',
  },
  descri: {
    padding: '50px',
    width: '150vh',
    border: '1px solid #d0d0d0',
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  lower: {
    fontSize: '14px',
  },
};

const Descriptionbox = () => {
  return (
    <div style={styles.desc}>
      <div style={styles.descBtn}>
        <div style={styles.descc}>
          <button style={{ ...styles.button, ...styles.description }}>Description</button>
          <button style={{ ...styles.button, ...styles.reviews }}>Reviews (122)</button>
        </div>
        <div style={styles.descri}>
          <p>
            An e-commerce website is an online platform that facilitates the buying and selling of products or services over the internet. It serves as a virtual marketplace where businesses and individuals can showcase their products, interact with customers, and conduct transactions without the need for a physical presence. E-commerce websites have gained immense popularity due to their convenience, accessibility, and the global reach they offer.
          </p>
          <span style={styles.lower}>
            E-commerce websites typically display products or services along with detailed descriptions, images, prices, and any available variations (e.g. sizes, colors). Each product usually has its own dedicated page with relevant information.
          </span>
        </div>
      </div>
    </div>
  );
};

export default Descriptionbox;