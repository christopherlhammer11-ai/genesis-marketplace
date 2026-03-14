import React from 'react';

const SkillCard = ({ skill }) => {
  const handleBuy = async () => {
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ priceId: skill.priceId }),
      });
      const data = await res.json();
      window.location.href = data.checkoutUrl;
    } catch (err) {
      console.error('Error creating checkout session:', err);
    }
  };

  return (
    <div className="skill-card">
      <h2>{skill.name}</h2>
      <p>{skill.description}</p>
      <button onClick={handleBuy}>Buy for {skill.price} FLUX</button>
    </div>
  );
};

export default SkillCard;