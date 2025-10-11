import React from 'react'

const LoadingSpinner = ({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) => {
    return (
        <div className={`flex items-center justify-center ${size === 'lg' ? 'h-12 w-12' : size === 'sm' ? 'h-4 w-4' : 'h-6 w-6'}`}>
            <div className={`${size === 'lg' ? 'h-8 w-8' : size === 'sm' ? 'h-3 w-3' : 'h-5 w-5'} animate-spin rounded-full border-2 border-solid border-current border-r-transparent`} />
        </div>
    )
}

export default LoadingSpinner
