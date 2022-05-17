import React from 'react'
import { Scrollbars } from 'react-custom-scrollbars'

function TopBar({ width }) {
    const menu = [
        { text: 'CRM', link: '', width: '' },
        { text: 'Bill Query', link: '', width: 100 },
        { text: 'BSS', link: '', width: '' },
        { text: 'Check Card', link: '', width: 125 },
        { text: 'SPNV', link: '', width: '' },
        { text: 'UPCC', link: '', width: '' },
        { text: 'CRM', link: '', width: '' },
        { text: 'Bill Query', link: '', width: 100 },
        { text: 'BSS', link: '', width: '' },
        { text: 'Check Card', link: '', width: 125 },
        { text: 'SPNV', link: '', width: '' },
        { text: 'UPCC', link: '', width: '' },
        { text: 'CRM', link: '', width: '' },
        { text: 'Bill Query', link: '', width: 100 },
        { text: 'BSS', link: '', width: '' },
        { text: 'Check Card', link: '', width: 125 },
        { text: 'SPNV', link: '', width: '' },
        { text: 'UPCC', link: '', width: '' },
        { text: 'CRM', link: '', width: '' },
        { text: 'Bill Query', link: '', width: 100 },
        { text: 'BSS', link: '', width: '' },
        { text: 'Check Card', link: '', width: 125 },
        { text: 'SPNV', link: '', width: '' },
        { text: 'UPCC', link: '', width: '' },
    ]
    return (
        <>
            <Scrollbars style={{ width: width, height: 40 }}>
                <div className='tab' style={{ width: '100%' }}>
                    {menu.map((row, idx) => {
                        return (
                            <div className='list' key={idx} style={{ minWidth: row.width }}>{row.text}</div>
                        )
                    })}
                </div>
            </Scrollbars>
        </>
    )
}

export default TopBar