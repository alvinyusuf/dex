import { Link } from 'react-router';
import Logo from '../assets/react.svg';
import { ConnectButton } from '@xellar/kit';

export default function Header() {
  return (
    <header className="w-full flex justify-between items-center p-4 bg-gray-800 text-white">
      <div className='flex items-center gap-8 text-xl font-semibold'>
        <img src={Logo} alt="logo" />
        <Link to="/">
          <button className="btn btn-ghost">Swap</button>
        </Link>
        <Link to="/tokens">
          <button className="btn btn-ghost">Tokens</button>
        </Link>
      </div>
      <div className="flex items-center gap-4">
        <ConnectButton />
      </div>
    </header>
  )
}
