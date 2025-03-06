import { HeroSection } from '@/components/ui/hero/HeroSection'
import { HomePageNavbar } from '@/components/ui/navbar/atomic/CustomNavbarMenu'

const Home = () => {
  return (
    <div className='flex flex-col'>

      <div className="bottom__navbar top__navbar w-full h-10 flex flex-row align-middle justify-center items-center mt-2">
        <HomePageNavbar />
      </div>
        <HeroSection/>
        <div className="p-4 most__order_section">

        {/* <MovingCards/> */}
        </div>

      </div>
  )
}

export default Home
