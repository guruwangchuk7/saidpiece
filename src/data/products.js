export const products = [
    {
        id: 1,
        title: 'Bespoke Oak Table',
        slug: 'bespoke-oak-table',
        price: '$2,400',
        category: 'furniture',
        images: [
            'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?q=80&w=1200&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1563298723-dcfebaa392e3?q=80&w=1200&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1517705008128-361805f42e86?q=80&w=1200&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1495433324511-bf8e92934d90?q=80&w=1200&auto=format&fit=crop'
        ],
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
        id: 6,
        title: 'Minimalist Lounge Chair',
        slug: 'minimalist-lounge-chair',
        price: '$1,200',
        category: 'furniture',
        images: [
            'https://images.unsplash.com/photo-1592078615290-033ee584e267?q=80&w=1200&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?q=80&w=1200&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=1200&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?q=80&w=1200&auto=format&fit=crop'
        ],
        colors: [
            { id: 'charcoal', name: 'Charcoal', hex: '#333333' },
            { id: 'sand', name: 'Sand', hex: '#D2B48C' }
        ],
        sizes: ['Standard'],
        information: [
            {
                title: 'Material',
                content: 'Constructed with a solid ash frame and premium upholstery. The materials are chosen for their longevity and sustainable sourcing.'
            },
            {
                title: 'Craftsmanship',
                content: 'Expertly upholstered with attention to every seam. The ergonomic design ensures comfort without compromising the sculptural silhouette.'
            },
            {
                title: 'Lead Time',
                content: 'Handmade to order. Delivery within 6-10 weeks.'
            }
        ]
    },
    {
        id: 3,
        title: 'Sculptural Floor Lamp',
        slug: 'sculptural-floor-lamp',
        price: '$890',
        category: 'lighting-electrical',
        images: [
            'https://images.unsplash.com/photo-1534073828943-f801091bb18c?q=80&w=1200&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1507473885765-e6ed657f9971?q=80&w=1200&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1513506494266-10141e1c4f52?q=80&w=1200&auto=format&fit=crop'
        ],
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
        images: [
            'https://images.unsplash.com/photo-1516455590571-18256e5bb9ff?q=80&w=1200&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=1200&auto=format&fit=crop'
        ],
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
        images: [
            'https://images.unsplash.com/photo-1510127034890-ba27508e9f1c?q=80&w=1200&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1558444479-c8a02e624c30?q=80&w=1200&auto=format&fit=crop'
        ],
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
        images: [
            'https://images.unsplash.com/photo-1578500494198-246f612d3b3d?q=80&w=1200&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=1200&auto=format&fit=crop'
        ],
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
    // --- ADDED PRODUCTS TO ENSURE RELATED ITEMS ---
    {
        id: 7,
        title: 'Modern Oak Credenza',
        slug: 'modern-oak-credenza',
        price: '$1,850',
        category: 'furniture',
        images: [
            'https://images.unsplash.com/photo-1595428774223-ef52624120d2?q=80&w=1200&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1538688549667-67df79ef1261?q=80&w=1200&auto=format&fit=crop'
        ],
        colors: [
            { id: 'natural', name: 'Natural Oak', hex: '#DAA520' }
        ],
        sizes: ['180cm Width', '220cm Width'],
        information: [
            { title: 'Material', content: 'Solid oak and oak veneers.' },
            { title: 'Craftsmanship', content: 'Minimalist joinery with soft-close hardware.' },
            { title: 'Lead Time', content: '8-10 weeks.' }
        ]
    },
    {
        id: 8,
        title: 'Linear Pendant Light',
        slug: 'linear-pendant-light',
        price: '$720',
        category: 'lighting-electrical',
        images: [
            'https://images.unsplash.com/photo-1540932239986-30128078f3c5?q=80&w=1200&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1513506494266-10141e1c4f52?q=80&w=1200&auto=format&fit=crop'
        ],
        colors: [
            { id: 'black', name: 'Anodized Black', hex: '#1A1A1A' }
        ],
        sizes: ['120cm', '150cm'],
        information: [
            { title: 'Material', content: 'Extruded aluminum with frosted acrylic diffuser.' },
            { title: 'Craftsmanship', content: 'Precision machined and finished.' },
            { title: 'Lead Time', content: '4 weeks.' }
        ]
    },
    {
        id: 9,
        title: 'Industrial Sconce',
        slug: 'industrial-sconce',
        price: '$285',
        category: 'lighting-electrical',
        images: [
            'https://images.unsplash.com/photo-1543157143-46273752c0fb?q=80&w=1200&auto=format&fit=crop'
        ],
        colors: [
            { id: 'steel', name: 'Raw Steel', hex: '#71797E' }
        ],
        sizes: ['Fixed'],
        information: [
            { title: 'Material', content: 'Hand-worked steel.' },
            { title: 'Craftsmanship', content: 'Exposed hardware and vintage-inspired design.' },
            { title: 'Lead Time', content: '2-3 weeks.' }
        ]
    },
    {
        id: 10,
        title: 'Oak Slat Partition',
        slug: 'oak-slat-partition',
        price: '$1,100',
        category: 'interior-finishes',
        images: [
            'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=1200&auto=format&fit=crop'
        ],
        colors: [
            { id: 'natural', name: 'Natural Oak', hex: '#DAA520' }
        ],
        sizes: ['Custom'],
        information: [
            { title: 'Material', content: 'Vertical oak slats.' },
            { title: 'Craftsmanship', content: 'Prefabricated sections for modular installation.' },
            { title: 'Lead Time', content: '6-8 weeks.' }
        ]
    },
    {
        id: 11,
        title: 'Venetian Plaster Panel',
        slug: 'venetian-plaster-panel',
        price: '$580',
        category: 'interior-finishes',
        images: [
            'https://images.unsplash.com/photo-1516455590571-18256e5bb9ff?q=80&w=1200&auto=format&fit=crop'
        ],
        colors: [
            { id: 'bone', name: 'Bone', hex: '#E3DAC9' }
        ],
        sizes: ['90x90cm'],
        information: [
            { title: 'Material', content: 'Authentic lime-based plaster.' },
            { title: 'Craftsmanship', content: 'Hand-troweled for a marble-like finish.' },
            { title: 'Lead Time', content: '3-4 weeks.' }
        ]
    },
    {
        id: 12,
        title: 'Minimalist Cabinet Pull',
        slug: 'minimalist-cabinet-pull',
        price: '$45',
        category: 'hardware-accessories',
        images: [
            'https://images.unsplash.com/photo-1558444479-c8a02e624c30?q=80&w=1200&auto=format&fit=crop'
        ],
        colors: [
            { id: 'black', name: 'Matte Black', hex: '#1A1A1A' }
        ],
        sizes: ['160mm'],
        information: [
            { title: 'Material', content: 'Stainless steel with powder coating.' },
            { title: 'Craftsmanship', content: 'Ergonomic slim profile.' },
            { title: 'Lead Time', content: 'In stock.' }
        ]
    },
    {
        id: 13,
        title: 'Architectural Hinge',
        slug: 'architectural-hinge',
        price: '$95',
        category: 'hardware-accessories',
        images: [
            'https://images.unsplash.com/photo-1510127034890-ba27508e9f1c?q=80&w=1200&auto=format&fit=crop'
        ],
        colors: [
            { id: 'zinc', name: 'Zinc Finish', hex: '#71797E' }
        ],
        sizes: ['Standard'],
        information: [
            { title: 'Material', content: 'Heavy-duty steel.' },
            { title: 'Craftsmanship', content: 'Silent operation and hidden installation.' },
            { title: 'Lead Time', content: '1 week.' }
        ]
    },
    {
        id: 14,
        title: 'Abstract Form 01',
        slug: 'abstract-form-01',
        price: '$950',
        category: 'decor-art',
        images: [
            'https://images.unsplash.com/photo-1510915367364-8394939cd4b5?q=80&w=1200&auto=format&fit=crop'
        ],
        colors: [
            { id: 'white', name: 'Statue White', hex: '#FFFFFF' }
        ],
        sizes: ['40cm Height'],
        information: [
            { title: 'Material', content: 'Hand-carved marble.' },
            { title: 'Craftsmanship', content: 'Unique sculptural form.' },
            { title: 'Lead Time', content: '4-6 weeks.' }
        ]
    },
    {
        id: 15,
        title: 'Linen Textile Wall Art',
        slug: 'linen-textile-wall-art',
        price: '$640',
        category: 'decor-art',
        images: [
            'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=1200&auto=format&fit=crop'
        ],
        colors: [
            { id: 'natural', name: 'Natural Linen', hex: '#FAF9F6' }
        ],
        sizes: ['100x120cm'],
        information: [
            { title: 'Material', content: 'Framed linen textile.' },
            { title: 'Craftsmanship', content: 'Woven with traditional patterns.' },
            { title: 'Lead Time', content: '3 weeks.' }
        ]
    }
];
