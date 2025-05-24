import React from 'react'

const VideoPage = () => {
    return (
        <main className='flex flex-col px-5 items-center justify-center min-h-screen'>
            <video
                className='aspect-video w-full max-w-3xl rounded-lg shadow-lg'
                src="https://ik.imagekit.io/ydh9fjwwcb/sample-video.mp4?updatedAt=1748077274997" controls>

            </video>
        </main>
    )
}

export default VideoPage