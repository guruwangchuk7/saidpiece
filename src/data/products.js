import img1 from '../assets/store/storeiteams/Wardrobe_accessories_b2.0_series_atmosphere_2_header-1920x901.jpg';
import img2 from '../assets/store/storeiteams/chair.jpg';
import img3 from '../assets/store/storeiteams/interiordesing.jpg';
import img4 from '../assets/store/storeiteams/pexels-pixabay-271795.jpg';
import img5 from '../assets/project-photo/clocktower.jpg';

export const products = [
    {
        id: 1,
        title: 'Bespoke Oak Table',
        slug: 'bespoke-oak-table',
        price: '$2,400',
        category: 'furniture',
        images: [img2],
        colors: [
            { id: 'natural', name: 'Natural Oak', hex: '#DAA520' },
            { id: 'dark', name: 'Dark Stained', hex: '#3B2F2F' },
            { id: 'white', name: 'White Wash', hex: '#F5F5F5' }
        ],
        sizes: ['Small (120x80cm)', 'Medium (160x90cm)', 'Large (200x100cm)', 'Bespoke Size'],
        information: [
            {
                title: 'Material',
                content: 'Sourced from sustainably managed European forests. Our solid oak is selected for its distinct grain patterns and structural integrity.'
            },
            {
                title: 'Craftsmanship',
                content: 'Each table is handcrafted using traditional joinery techniques. The surface is finished with multiple layers of natural oil for a durable and sensory experience.'
            },
            {
                title: 'Lead Time',
                content: 'As each piece is made to order, please allow 8-12 weeks for production and delivery.'
            }
        ]
    },
    {
        id: 3,
        title: 'Sculptural Floor Lamp',
        slug: 'sculptural-floor-lamp',
        price: '$890',
        category: 'lighting-electrical',
        images: [img1],
        colors: [
            { id: 'bronze', name: 'Aged Bronze', hex: '#614E1A' },
            { id: 'black', name: 'Matte Black', hex: '#1A1A1A' }
        ],
        sizes: ['Standard (160cm Height)'],
        information: [
            {
                title: 'Material',
                content: 'Hand-finished metal with a weighted base. The shade is crafted from translucent linen to provide a warm, diffused glow.'
            },
            {
                title: 'Craftsmanship',
                content: 'The finish is applied by hand, creating a unique patina on every piece. Integrated dimmable controls for atmospheric versatility.'
            },
            {
                title: 'Lead Time',
                content: 'In stock. Shipping within 1-2 weeks.'
            }
        ]
    },
    {
        id: 2,
        title: 'Textured Wall Panel',
        slug: 'textured-wall-panel',
        price: '$450',
        category: 'interior-finishes',
        images: [img3],
        colors: [
            { id: 'clay', name: 'Raw Clay', hex: '#B87333' },
            { id: 'concrete', name: 'Grey Concrete', hex: '#808080' }
        ],
        sizes: ['60x60cm', '120x60cm', 'Bespoke Size'],
        information: [
            {
                title: 'Material',
                content: 'Composite material with natural mineral pigments. Designed for acoustic performance and visual depth.'
            },
            {
                title: 'Craftsmanship',
                content: 'Each panel is cast from a unique mold to ensure a non-repeating pattern across large installations.'
            },
            {
                title: 'Lead Time',
                content: 'Production time 4-6 weeks based on volume.'
            }
        ]
    },
    {
        id: 4,
        title: 'Machined Brass Handle',
        slug: 'machined-brass-handle',
        price: '$120',
        category: 'hardware-accessories',
        images: [img4],
        colors: [
            { id: 'brass', name: 'Polished Brass', hex: '#CD7F32' },
            { id: 'satin', name: 'Satin Brass', hex: '#DAA520' }
        ],
        sizes: ['150mm', '250mm', 'Bespoke'],
        information: [
            {
                title: 'Material',
                content: 'Solid brass bar stock, CNC machined for absolute precision. Designed to age gracefully and develop a rich patina over time.'
            },
            {
                title: 'Craftsmanship',
                content: 'Finished by hand with a clear protective coating or left raw for natural aging. Heavyweight feel that communicates quality and permanence.'
            },
            {
                title: 'Lead Time',
                content: 'Ships in 5-7 business days.'
            }
        ]
    },
    {
        id: 5,
        title: 'Ceramic Vessel 01',
        slug: 'ceramic-vessel-01',
        price: '$320',
        category: 'decor-art',
        images: [img5],
        colors: [
            { id: 'pumice', name: 'Pumice', hex: '#D3D3D3' },
            { id: 'obsidian', name: 'Obsidian', hex: '#1A1A1A' }
        ],
        sizes: ['Small (20cm)', 'Large (35cm)'],
        information: [
            {
                title: 'Material',
                content: 'High-fire stoneware with a textured matte glaze. Each vessel is non-porous and water-tight.'
            },
            {
                title: 'Craftsmanship',
                content: 'Hand-thrown on the potter\'s wheel. The subtle variations in form and glaze are a celebration of the maker\'s hand.'
            },
            {
                title: 'Lead Time',
                content: 'Limited edition. In stock items ship within 3 days.'
            }
        ]
    }
];
