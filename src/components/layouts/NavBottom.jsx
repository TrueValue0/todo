import { BottomList } from '@/components/layouts/MenuList'
import { useMenu } from '@/hooks/useMenu';
import '@/components/layouts/navBottom.css'

export default function NavBottom() {
    const { navBottom } = useMenu();
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