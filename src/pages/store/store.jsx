

import { NavLink } from 'react-router-dom';
import rightArrow from '../../assets/icons/rightArrow.svg';
import ButtonType3 from '../../components/ButtonType3';
import PortfolioCard from '../../components/PortfolioCard';
import H5 from '../home/H5';

import photo1 from '../../assets/project-photo/1.jpg';
import photo2 from '../../assets/project-photo/2.jpg';
import photo3 from '../../assets/project-photo/3.jpg';
import photo4 from '../../assets/project-photo/4.jpg';
import photo5 from '../../assets/project-photo/5.jpg';
import photo6 from '../../assets/project-photo/6.jpg';

const storeItems = [
	{ id: 1, image: photo1, title: 'Bhutanese Print', subtitle: 'Limited edition art print', location: 'Art Foundation' },
	{ id: 2, image: photo2, title: 'Handcrafted Bowl', subtitle: 'Traditional wooden bowl', location: 'Bhutan' },
	{ id: 3, image: photo3, title: 'Sculpture', subtitle: 'Contemporary sculpture', location: 'Gallery' },
	{ id: 4, image: photo4, title: 'Textile', subtitle: 'Handwoven textile', location: 'Artisan Collective' },
	{ id: 5, image: photo5, title: 'Ceramic Vase', subtitle: 'Modern ceramic art', location: 'Art Foundation' },
	{ id: 6, image: photo6, title: 'Art Book', subtitle: 'Curated art book', location: 'Store' },
];

const Store = () => {
	return (
		<div>
			<div className="min-h-screen relative flex items-start justify-center bg-white px-4 lg:px-20 py-10">
				<NavLink to="/" className="absolute top-10 left-4 flex items-center gap-2 text-sm font-medium hover:underline">
					<img src={rightArrow} alt="back" className="w-4 h-4 rotate-180" />
					<span>Back to home</span>
				</NavLink>
				<div className="w-full px-6 py-20">
					{/* Header section - similar to Portfolio page */}
					<div className="mb-16 lg:mb-20">
						<div className="logo font-bold text-3xl text-neutral-800 lg:text-7xl" style={{ fontFamily: "century-gothic" }}>
                            <span style={{ color: "#555555" }} className="font-light">said</span><span style={{ opacity: 0.95 }}>piece</span> <span className="font-light">studio</span>
                        </div>
						<p className="text-zinc-600 text-base lg:text-lg leading-relaxed max-w-2xl">
							Discover and support Bhutanese art, design, and culture. Proceeds fund creative initiatives and community projects.
						</p>
						<div className="mt-8">
							<ButtonType3 title="Contact Us" to="/contact" />
						</div>
					</div>
					{/* Store grid */}
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
						{storeItems.map((item) => (
							<PortfolioCard
								key={item.id}
								image={item.image}
								alt={item.title}
								title={item.title}
								subtitle={item.subtitle}
								location={item.location}
							/>
						))}
					</div>
				</div>
			</div>
			<H5 />
		</div>
	);
};

export default Store;
