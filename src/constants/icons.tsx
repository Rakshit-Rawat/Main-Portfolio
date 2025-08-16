import * as React from "react";

// Shared props so all icons can be sized the same way
export type IconProps = React.SVGProps<SVGSVGElement> & {
  size?: number | string; // e.g. 20 or "1.25rem"
};

const sizeToEm = (size?: number | string) =>
  size === undefined ? "1em" : typeof size === "number" ? `${size}px` : size;

/* --- Brand Icons --- */

export const GithubIcon: React.FC<IconProps> = ({
  size,
  className,
  ...props
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={sizeToEm(size)}
    height={sizeToEm(size)}
    viewBox="0 0 64 64"
    className={className}
    {...props}
  >
    <path
      fill="currentColor"
      d="M32 1.8c-17 0-31 13.8-31 31C1 46.4 9.9 58 22.3 62.2c1.6.3 2.1-.7 2.1-1.4s0-2.7-.1-5.4c-8.6 2-10.4-4.2-10.4-4.2c-1.4-3.5-3.5-4.5-3.5-4.5c-2.8-2 .1-2 .1-2c3.1.1 4.8 3.2 4.8 3.2c2.7 4.8 7.3 3.4 9 2.5c.3-2 1.1-3.4 2-4.2c-6.8-.7-14.1-3.4-14.1-15.2c0-3.4 1.3-6.1 3.2-8.2c-.3-.7-1.4-3.9.3-8.2c0 0 2.7-.8 8.6 3.2c2.5-.7 5.1-1.1 7.8-1.1s5.4.3 7.8 1.1c5.9-3.9 8.5-3.2 8.5-3.2c1.7 4.2.7 7.5.3 8.2c2 2.1 3.2 4.9 3.2 8.2c0 11.8-7.3 14.5-14.1 15.2c1.1 1 2.1 3 2.1 5.8c0 4.2-.1 7.5-.1 8.5c0 .8.6 1.7 2.1 1.4C54.1 57.8 63 46.3 63 32.6c-.1-17-14-30.8-31-30.8"
    />
  </svg>
);

export const LinkedInIcon: React.FC<IconProps> = ({
  size,
  className,
  ...props
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={sizeToEm(size)}
    height={sizeToEm(size)}
    viewBox="0 0 64 64"
    className={className}
    {...props}
  >
    <path
      fill="currentColor"
      d="M58.5 1H5.6C3.1 1 1.1 3 1.1 5.5v53c0 2.4 2 4.5 4.5 4.5h52.7c2.5 0 4.5-2 4.5-4.5V5.4C63 3 61 1 58.5 1M19.4 53.7h-9.1V24.2h9.1zm-4.6-33.6c-3 0-5.3-2.4-5.3-5.3s2.4-5.3 5.3-5.3s5.3 2.4 5.3 5.3s-2.2 5.3-5.3 5.3m39.1 33.6h-9.1V39.4c0-3.4-.1-7.9-4.8-7.9c-4.8 0-5.5 3.8-5.5 7.6v14.6h-9.1V24.2h8.9v4.1h.1c1.3-2.4 4.2-4.8 8.7-4.8c9.3 0 11 6 11 14.2v16z"
    />
  </svg>
);

export const TwitterIcon: React.FC<IconProps> = ({
  size,
  className,
  ...props
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={sizeToEm(size)}
    height={sizeToEm(size)}
    viewBox="0 0 512 512"
    className={className}
    {...props}
  >
    <path
      fill="currentColor"
      d="M389.2 48h70.6L305.6 224.2L487 464H345L233.7 318.6L106.5 464H35.8l164.9-188.5L26.8 48h145.6l100.5 132.9zm-24.8 373.8h39.1L151.1 88h-42z"
    />
  </svg>
);

export const GoogleIcon: React.FC<IconProps> = ({
  size,
  className,
  ...props
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={sizeToEm(size)}
    height={sizeToEm(size)}
    viewBox="0 0 24 24"
    className={className}
    {...props}
  >
    <path
      fill="currentColor"
      fillRule="evenodd"
      clipRule="evenodd"
      d="M3.688 4H2a1 1 0 0 0-1 1v.04l11 8.031l11-8.03V5a1 1 0 0 0-1-1h-1.688L12 9.92zm14.039 0L12 8.08L6.273 4zM23 6.898l-2.75 2.007V20H22a1 1 0 0 0 1-1zM18.75 20V10L12 14.928l-6.75-4.927V20zm-15 0V8.905L1 6.898V19a1 1 0 0 0 1 1z"
    />
  </svg>
);

export const ExternalLink: React.FC<IconProps> = ({
  size,
  className,
  ...props
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={sizeToEm(size)}
    height={sizeToEm(size)}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path d="M12 6h-6a2 2 0 0 0 -2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-6" />
    <path d="M11 13l9 -9" />
    <path d="M15 4h5v5" />
  </svg>
);

export const Resume: React.FC<IconProps> = ({ size, className, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={sizeToEm(size)}
    height={sizeToEm(size)}
    viewBox="0 0 20 20"
    className={className}
    {...props}
  >
    <path
      fill="currentColor"
      d="M6 2a2 2 0 0 0-2 2v5.041a3 3 0 0 1 1 0V4a1 1 0 0 1 1-1h4v3.5A1.5 1.5 0 0 0 11.5 8H15v8a1 1 0 0 1-1 1H8.962a3.2 3.2 0 0 1-.33 1H14a2 2 0 0 0 2-2V7.414a1.5 1.5 0 0 0-.44-1.06l-3.914-3.915A1.5 1.5 0 0 0 10.586 2zm8.793 5H11.5a.5.5 0 0 1-.5-.5V3.207zM6.5 12a2 2 0 1 1-4 0a2 2 0 0 1 4 0M8 16.5C8 17.745 7 19 4.5 19S1 17.75 1 16.5A1.5 1.5 0 0 1 2.5 15h4A1.5 1.5 0 0 1 8 16.5"
    />
  </svg>
);

export const ContactMe: React.FC<IconProps> = ({
  size,
  className,
  ...props
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={sizeToEm(size)}
    height={sizeToEm(size)}
    viewBox="0 0 24 24"
    className={className}
    {...props}
  >
    <mask id="SVGinvCOd0m">
      <g
        fill="none"
        stroke="#fff"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      >
        <path
          strokeDasharray="64"
          strokeDashoffset="64"
          d="M4 5h16c0.55 0 1 0.45 1 1v12c0 0.55 -0.45 1 -1 1h-16c-0.55 0 -1 -0.45 -1 -1v-12c0 -0.55 0.45 -1 1 -1Z"
        >
          <animate
            attributeName="stroke-dashoffset"
            fill="freeze"
            dur="0.3s"
            values="64;0"
          />
        </path>
        <path
          strokeDasharray="24"
          strokeDashoffset="24"
          d="M3 6.5l9 5.5l9 -5.5"
        >
          <animate
            attributeName="stroke-dashoffset"
            fill="freeze"
            begin="0.3s"
            dur="0.1s"
            values="24;0"
          />
        </path>
        <path
          fill="#fff"
          fillOpacity="0"
          stroke="none"
          d="M12 11l-8 -5h16l-8 5Z"
        >
          <animate
            attributeName="fill-opacity"
            fill="freeze"
            begin="0.6s"
            dur="0.25s"
            values="0;1"
          />
        </path>
        <path
          fill="#000"
          fillOpacity="0"
          stroke="none"
          d="M19 13c3.31 0 6 2.69 6 6c0 3.31 -2.69 6 -6 6c-3.31 0 -6 -2.69 -6 -6c0 -3.31 2.69 -6 6 -6Z"
        >
          <set attributeName="fill-opacity" fill="freeze" begin="0.4s" to="1" />
        </path>
        <path strokeDasharray="6" strokeDashoffset="6" d="M19 21v-5">
          <animate
            attributeName="stroke-dashoffset"
            fill="freeze"
            begin="0.2s"
            dur="0.05s"
            values="6;0"
          />
        </path>
        <path
          strokeDasharray="4"
          strokeDashoffset="4"
          d="M19 16l2 2M19 16l-2 2"
        >
          <animate
            attributeName="stroke-dashoffset"
            fill="freeze"
            begin="0.5s"
            dur="0.05s"
            values="4;0"
          />
        </path>
      </g>
    </mask>
    <rect width="24" height="24" fill="currentColor" mask="url(#SVGinvCOd0m)" />
  </svg>
);
