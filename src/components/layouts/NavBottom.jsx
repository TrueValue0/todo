import { BottomList } from '@/components/layouts/MenuList'
import { navBottom } from '@/components/layouts/menu';
import '@/components/layouts/navBottom.css'

export default function NavBottom() {
    return (
        <>
            <div className="nav">
                <ul className="nav-content">
                    <BottomList items={navBottom} />
                    {/* <span className="indicator"></span> */}
                </ul>
            </div>
        </>
    )
}