import React from 'react';

export const ArrowLeft: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
    return (
        <svg
            role='button'
            xmlns='http://www.w3.org/2000/svg'
            width='21'
            height='21'
            viewBox='0 0 21 21'
            fill='none'
            {...props}
        >
            <path
                stroke='#313130'
                strokeWidth='1.5'
                strokeLinecap='round'
                strokeLinejoin='round'
                d='m10.57 17.4-7.19-6.87 7.2-6.86M3.38 10.53h15'
            />
        </svg>
    );
};
