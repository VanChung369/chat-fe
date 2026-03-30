interface ChatIconProps {
  className?: string;
}

export default function ChatIcon({ className }: ChatIconProps) {
  return (
    <svg 
      width="40" 
      height="40" 
      viewBox="0 0 40 40" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path 
        d="M40 40L32 32H12C10.9 32 9.95833 31.6083 9.175 30.825C8.39167 30.0417 8 29.1 8 28V26H30C31.1 26 32.0417 25.6083 32.825 24.825C33.6083 24.0417 34 23.1 34 22V8H36C37.1 8 38.0417 8.39167 38.825 9.175C39.6083 9.95833 40 10.9 40 12V40ZM4 20.35L6.35 18H26V4H4V20.35ZM0 30V4C0 2.9 0.391667 1.95833 1.175 1.175C1.95833 0.391667 2.9 0 4 0H26C27.1 0 28.0417 0.391667 28.825 1.175C29.6083 1.95833 30 2.9 30 4V18C30 19.1 29.6083 20.0417 28.825 20.825C28.0417 21.6083 27.1 22 26 22H8L0 30ZM4 18V4V18Z" 
        fill="currentColor"
      />
    </svg>
  );
}
