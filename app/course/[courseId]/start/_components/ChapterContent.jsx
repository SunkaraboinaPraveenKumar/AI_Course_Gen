import React from 'react';
import YouTube from 'react-youtube';
import ReactMarkdown from 'react-markdown';

function ChapterContent({ chapter, content }) {
    const options = {
        height: '390',
        width: '640',
        playerVars: {
            autoplay: 0,
        },
    };

    const mobileOptions = {
        height: '200',
        width: '100%',
        playerVars: {
            autoplay: 0,
        },
    };

    return (
        <div className='p-5 md:p-10'>
            <h2 className='font-medium text-xl md:text-2xl'>{chapter?.ChapterName}</h2>
            <p className='text-gray-500 text-sm md:text-base'>{chapter?.About}</p>

            {/* Video */}
            <div className='flex justify-center my-4 md:my-6 items-center'>
                <div className='block md:hidden'>
                    <YouTube
                        videoId={content?.videoId}
                        opts={mobileOptions}
                    />
                </div>
                <div className='hidden md:block'>
                    <YouTube
                        videoId={content?.videoId}
                        opts={options}
                    />
                </div>
            </div>

            {/* Content */}
            <div>
                {content?.content?.map((item, index) => (
                    <div key={index} className='p-4 md:p-5 bg-slate-50 mb-3 rounded-lg'>
                        <h2 className='font-medium text-base md:text-lg'>{item.title}</h2>

                        {/* Markdown-formatted explanation */}
                        <ReactMarkdown className='whitespace-pre-wrap text-sm md:text-base'>
                            {item?.explanation}
                        </ReactMarkdown>

                        {/* Code Example */}
                        {item?.code_example &&
                            <div className='p-3 md:p-4 bg-black text-white rounded mt-3 overflow-x-auto'>
                                <pre>
                                    <code className='text-xs md:text-sm'>
                                        {item.code_example}
                                    </code>
                                </pre>
                            </div>
                        }
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ChapterContent;
