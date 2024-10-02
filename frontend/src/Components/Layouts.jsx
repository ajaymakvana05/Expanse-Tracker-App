import Footer from "./Footer"
import Header from "./Header"

// eslint-disable-next-line react/prop-types
const Layouts = ({ children }) => {
    return (
        <>
            <Header />
            <div className="content">
                {children}
            </div>
            <Footer />
        </>

    )
}

export default Layouts
