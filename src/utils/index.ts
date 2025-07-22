export const LOCAL_STORAGE_KEY = 'basket';

export const smallIconStyle = {
  backgroundColor: '#fff',
  color: '#2ecc71',
  border: '1px solid #ccc',
  cursor: 'pointer',
};

export const largeIconStyle = {
  backgroundColor: '#d5f5e3',
  color: '#2ecc71',
  cursor: 'pointer',
};

export const formatPhoneNumber = (input: string): string => {
  const digits = input.replace(/\D/g, '').slice(0, 12);
  let formatted = '+380';

  if (digits.length > 3) {
    const phoneDigits = digits.slice(3);
    const parts = [
      phoneDigits.slice(0, 2),
      phoneDigits.slice(2, 5),
      phoneDigits.slice(5, 7),
      phoneDigits.slice(7, 9),
    ].filter(Boolean);

    formatted += ' ' + parts.join(' ');
  } else {
    formatted += ' ' + digits.slice(3);
  }

  return formatted;
};

export const feedbackList = [
  {
    id: 1,
    image: '/images/feedback1.jpg',
  },
  {
    id: 2,
    image: '/images/feedback4.jpg',
  },
  {
    id: 3,
    image: '/images/feedback5.jpg',
  },
  {
    id: 4,
    image: '/images/feedback2.jpg',
  },
  {
    id: 5,
    image: '/images/feedback3.jpg',
  },
  {
    id: 6,
    image: '/images/feedback6.jpg',
  },
];
