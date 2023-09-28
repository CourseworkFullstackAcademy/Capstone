import "./home-banner.css"

export default function HomeBanner() {
	const username = localStorage.getItem("username");

	return (
		<div className="container mb-0 pt-4 banner">
			<div className="row">
				<div className="col-7 text-left pt-0"><span>{username ? username : "Welcome"}, Shop Fall sales and save!</span></div>
				<div className="col-3 text-center">Up to 100% Off</div>
				<div className="col-2 text-right p-0"><a href="">Learn More</a></div>
			</div>
			</div>)
}
