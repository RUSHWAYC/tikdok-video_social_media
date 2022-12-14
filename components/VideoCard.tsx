import { useState, useEffect, useRef } from 'react'
import { NextPage } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { HiVolumeUp, HiVolumeOff } from 'react-icons/hi'
import { BsPlay, BsFillPlayFill, BsFillPauseFill } from 'react-icons/bs'
import { GoVerified } from 'react-icons/go'

import { Video } from '../types'

interface IProps {
    post: Video
}

//Prop of ../pages/index.tsx
const VideoCard: NextPage<IProps> = ({ post }) => {

  const [isHover, setIsHover] = useState(false)
  const [playing, setPlaying] = useState(false)
  const [isVideoMuted, setIsVideoMuted] = useState(false)

  const videoRef = useRef<HTMLVideoElement>(null)

  const onVideoPress = () => {
    if (playing) {
      videoRef?.current?.pause()
      setPlaying(false)
    } else {
      videoRef?.current?.play()
      setPlaying(true)
    }
  }

  useEffect(() => {
    if(videoRef?.current) {
      videoRef.current.muted = isVideoMuted
    }
  }, [isVideoMuted])

  return (
    <div className='flex flex-col border-b-2 border-gray-200 pb-6'>
      <div>
        <div className='flex gap-3 p-2 cursor-pointer font-semibold rounded'>
          {/** Profile picture on the post. */}
          <div className='md:w-16 md:h-16 w-10 h-10'>
            <Link href={`api/profile/${post.postedBy._id}`} >
              <>
                <Image
                  width={62}
                  height={62}
                  className='rounded-full'
                  //Post from here is the prop gotten from IProps.
                  src={post.postedBy.image}
                  alt="profile photo"
                  layout='responsive'
                />
              </>
            </Link>
          </div>
          {/** Username. */}
          <div>
            <Link href={`/profile/${post.postedBy._id}`} >
              <div className='flex items-center gap-2'>
                <p className='flex gap-2 items-center md:text-md font-bold text-primary'>
                  {post.postedBy.userName}
                  {` `}
                  <GoVerified className='text-blue-400 text-md' />
                </p>
                <p className='capitalize font-md text-xs text-gray-500 hideen md:block'>{post.postedBy.userName}</p>
              </div>  
            </Link>
          </div>
        </div>
      </div>
      {/** Video. */}
      <div className='lg:ml-20 flex gap-4 relative'>
        <div onMouseEnter={() => setIsHover(true)}
             onMouseLeave={() => setIsHover(false)}
             className='rounded-3xl'>
          <Link href={`/detail/${post._id}`} >
            <video
              src={post.video.asset.url}
              loop
              //Use this video tag as a reference for onVideoPress function.
              ref={videoRef}
              className='lg:w-[600px] h-[300px] md:h-[400px] lg:h-[528px] w-[400px] rounded-2xl cursor-pointer bg-gray-100'>
            </video>
          </Link>

          {/** On hover show video options. */}
          {isHover && (
            <div className='absolute bottom-6 cursor-pointer left-4 md:left-7 lg:left-0 flex gap-10 lg:justify-between w-[100px] md:w-[50px] lg:w-[100px] p-3'>
              {/** Play/Pause buttons. */}
              {playing ? (
                <button onClick={onVideoPress}>
                  <BsFillPauseFill className='text-black text-3xl md:text-4xl lg:text-4xl' />
                </button>
              ) : (
                <button onClick={onVideoPress}>
                  <BsFillPlayFill className='text-black text-3xl md:text-4xl lg:text-4xl' />
                </button>
              )}

              {/** Mute/Unmute video. */}
              {isVideoMuted ? (
                <button onClick={() => setIsVideoMuted(false)} >
                  <HiVolumeOff className='text-black text-2xl md:text-4xl lg:text-4xl' />
                </button>
              ) : (
                <button onClick={() => setIsVideoMuted(true)} >
                  <HiVolumeUp className='text-black text-2xl md:text-4xl lg:text-4xl' />
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default VideoCard