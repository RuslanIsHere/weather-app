import logo from "../assets/images/logo.svg";
import units from "../assets/images/icon-units.svg";
import dropdown from "../assets/images/icon-dropdown.svg";


export default function Header() {
    return (
        <>
            <header className="wrapper flex items-center justify-between py-4">
                <img
                    src={logo}
                    alt="Logo Weather Now"
                    className="h-10"
                />
                <div className="inline-flex items-center gap-[10px] px-4 py-3 rounded-[16px] bg-[var(--neutral-800)]">
                    <img
                        src={units}
                        alt="Icon Units"
                        className=""
                    />
                    <span className="text-present-7">Units</span>
                    <img
                        src={dropdown}
                        alt="Dropdown Icon"
                        className=""
                    />
                </div>
            </header>

        </>
    )
}