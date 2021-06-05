import "../App.css"
export default function Header(props) {
    return (
        <nav className="navbar navbar-warning text-light bg-warning justify-content-between">
            <div className="navbar-brand text-center m-auto"style={{fontSize: '20px'}}>Food Ordering Portal</div>
            <a href='/cart'><button id="cart-button" className="btn btn-outline-dark" ><i className="fa fa-shopping-cart"  />{props.cartLength}</button></a>

            
        </nav>

    );
}