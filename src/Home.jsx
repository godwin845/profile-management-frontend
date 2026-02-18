import ProfileHead from './components/ProfileHead'
import ProfileDetails from './components/ProfileDetails'

const Home = () => {
  return (
    <div className='w-[80%] ml-20 pb-1'>
        <ProfileHead />
        <ProfileDetails />
    </div>
  )
}

export default Home;