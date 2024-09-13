import React from 'react'
import YouTube from 'react-youtube'
import ReactMarkdown from 'react-markdown'

function ChapterContent({chapter, content }) {
    const options = {
        height: '390',
        width: '640',
        playerVars: {
            autoplay: 0,
        },
    };

    return (
        <div className='p-10'>
            <h2 className='font-medium text-2xl'>{chapter?.ChapterName}</h2>
            <p className='text-gray-500'>{chapter?.About}</p>

            {/* Video */}
            <div className='flex justify-center my-6 items-center'>
                <YouTube
                    videoId={chapter?.videoId}
                    opts={options}
                />
            </div>

            {/* Content */}
            <div>
                {
                    content?.content?.map((item, index) => (
                        <div key={index} className='p-5 bg-slate-50 mb-3 rounded-lg'>
                            <h2 className='font-medium text-lg'>{item.title}</h2>
                            
                            {/* Markdown-formatted explanation */}
                            <ReactMarkdown className='whitespace-pre-wrap'>
                                {item?.explanation}
                            </ReactMarkdown>

                            {/* Code Example */}
                            {item?.code_example &&
                                <div className='p-4 bg-black text-white rounded mt-3'>
                                    <pre>
                                        <code>
                                            {item.code_example}
                                        </code>
                                    </pre>
                                </div>
                            }
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default ChapterContent
