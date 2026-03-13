import img1 from '../assets/store/storeiteams/Wardrobe_accessories_b2.0_series_atmosphere_2_header-1920x901.webp';
import img2 from '../assets/store/storeiteams/chair.webp';
import img3 from '../assets/store/storeiteams/interiordesing.webp';
import img4 from '../assets/store/storeiteams/pexels-pixabay-271795.webp';
import img5 from '../assets/project-photo/clocktower.webp';
import img6 from '../assets/store/storeiteams/WhatsApp-Image-2025-07-24-at-12.40.28-1.webp';
import img7 from '../assets/store/storeiteams/pexels-artbovich-6585598.webp';
import img8 from '../assets/store/storeiteams/3mpRanT6SxUwnXmCHMyEXV.webp';
import img9 from '../assets/store/storeiteams/pexels-pixabay-279719.webp';
import img10 from '../assets/store/storeiteams/pexels-vika-glitter-392079-1648771.webp';


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
    },
    {
        id: 6,
        title: 'Minimalist Lounge Chair',
        slug: 'minimalist-lounge-chair',
        price: '$1,200',
        category: 'furniture',
        images: [img6],
        colors: [
            { id: 'slate', name: 'Slate Grey', hex: '#708090' },
            { id: 'cream', name: 'Cream', hex: '#FFFDD0' }
        ],
        sizes: ['Standard'],
        information: [
            {
                title: 'Material',
                content: 'Upholstered in premium textured linen over a solid ash wood frame.'
            },
            {
                title: 'Craftsmanship',
                content: 'Ergonomically designed for extended comfort without compromising on a sleek silhouette.'
            },
            {
                title: 'Lead Time',
                content: 'Ships in 4-6 weeks.'
            }
        ]
    },
    {
        id: 7,
        title: 'Brass Pendant Light',
        slug: 'brass-pendant-light',
        price: '$550',
        category: 'lighting-electrical',
        images: [img7],
        colors: [
            { id: 'brass', name: 'Polished Brass', hex: '#CD7F32' }
        ],
        sizes: ['Small', 'Large'],
        information: [
            {
                title: 'Material',
                content: 'Spun brass shade with a frosted glass diffuser for soft, ambient lighting.'
            },
            {
                title: 'Craftsmanship',
                content: 'Constructed by master metalworkers, retaining subtle textures from the spinning process.'
            },
            {
                title: 'Lead Time',
                content: 'Ships in 2-3 weeks.'
            }
        ]
    },
    {
        id: 8,
        title: 'Acoustic Wood Slat',
        slug: 'acoustic-wood-slat',
        price: '$280',
        category: 'interior-finishes',
        images: [img8],
        colors: [
            { id: 'walnut', name: 'Walnut', hex: '#5C4033' },
            { id: 'oak', name: 'Oak', hex: '#DAA520' }
        ],
        sizes: ['Standard Panel (240x60cm)'],
        information: [
            {
                title: 'Material',
                content: 'Natural wood veneer strips mounted on a recycled felt acoustic backing.'
            },
            {
                title: 'Craftsmanship',
                content: 'Precision cut for seamless edge-to-edge installation to create continuous linear designs.'
            },
            {
                title: 'Lead Time',
                content: 'In stock. Ships within 5 days.'
            }
        ]
    },
    {
        id: 9,
        title: 'Knurled Cabinet Knob',
        slug: 'knurled-cabinet-knob',
        price: '$45',
        category: 'hardware-accessories',
        images: [img9],
        colors: [
            { id: 'matte-black', name: 'Matte Black', hex: '#1A1A1A' },
            { id: 'gold', name: 'Brushed Gold', hex: '#D4AF37' }
        ],
        sizes: ['30mm Diameter'],
        information: [
            {
                title: 'Material',
                content: 'Solid stainless steel with diamond-cut knurling.'
            },
            {
                title: 'Craftsmanship',
                content: 'Provides an exquisite tactile experience engineered for daily functional use.'
            },
            {
                title: 'Lead Time',
                content: 'Ships in 3-5 business days.'
            }
        ]
    },
    {
        id: 10,
        title: 'Textured Canvas Print',
        slug: 'textured-canvas-print',
        price: '$850',
        category: 'decor-art',
        images: [img10],
        colors: [
            { id: 'neutral', name: 'Neutral Tones', hex: '#D3D3D3' }
        ],
        sizes: ['Medium (90x60cm)', 'Large (120x80cm)'],
        information: [
            {
                title: 'Material',
                content: 'Archival canvas with heavy impasto acrylic detailing applied by hand.'
            },
            {
                title: 'Craftsmanship',
                content: 'Set within a minimal floating oak frame, arriving ready to hang.'
            },
            {
                title: 'Lead Time',
                content: 'Ships in 2-4 weeks.'
            }
        ]
    }
];
