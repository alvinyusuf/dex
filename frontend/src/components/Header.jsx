import Logo from '../assets/react.svg';

export default function Header() {
  return (
    <header className="w-full flex justify-between items-center p-4 bg-gray-800 text-white">
      <div className='flex items-center gap-8 text-xl font-semibold'>
        <img src={Logo} alt="logo" />
        <button className="btn btn-ghost">Swap</button>
        <button className="btn btn-ghost">Tokens</button>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 bg-gray-700 p-2 rounded-lg font-semibold hover:bg-gray-600 transition-colors">
          <img src="/eth.png" alt="Ethereum" width={24} height={24} />
          Ethereum
        </div>
        <button className="btn btn-neutral rounded-lg">Connect Wallet</button>
      </div>
    </header>
  )
}
