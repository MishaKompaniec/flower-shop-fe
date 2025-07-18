import type { FC } from 'react';

const BasketIcon: FC<{ className?: string; onClick?: () => void }> = ({
  className,
  onClick,
}) => (
  <svg
    onClick={onClick}
    className={className}
    viewBox='0 0 512 512'
    xmlns='http://www.w3.org/2000/svg'
    fill='currentColor'
  >
    <path d='M405.3,192L320,0h-42.7l85.3,192H405.3z M234.7,0H192l-85.3,192h42.7L234.7,0z M42.7,469.3c0,23.5,19.1,42.7,42.7,42.7 h341.3c23.5,0,42.7-19.1,42.7-42.7l21.3-192H21.3L42.7,469.3z M362.7,320h42.7L384,469.3h-42.7L362.7,320z M234.7,320h42.7v149.3 h-42.7V320z M149.3,320l21.3,149.3H128L106.7,320H149.3z M490.7,213.3H21.3C9.5,213.3,0,222.9,0,234.7V256h512v-21.3 C512,222.9,502.5,213.3,490.7,213.3z' />
  </svg>
);

export default BasketIcon;
