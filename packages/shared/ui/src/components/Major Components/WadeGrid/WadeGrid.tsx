import React from 'react'

/**
 * A Flexible CSS Gridd Wrapper
 * cols can be controled vis Directus to Change Layout without code 
 */

export const WadeGrid = ({children, cols=3}:{children:React.ReactNode, cols?:number})=>{
    return(
        <div style={{
            display:'grid',
            //Responsive grid: stays in 1 col on mobile, cols on desktop
            gridTemplateColumns: `repeat(auto-fit, minmax(min(100%, 300px), 1fr))`,
            gap:'24px',
            width:'100%',
            maxWidth:'1200px',
            margin:'0 auto'
        }}>
            {/* If we want strict columns, we can overide the template here */}
            <style>{`
                @media (min-width: 900px) {
                .wade-grid { grid-template-columns: repeat(${cols}, 1fr) !important; }
                }
            `}</style>
            <div className="wade-grid" style={{ display: 'contents' }}>
                {children}
            </div>
    </div>
  );
};


