export interface Image {
    type: string;
    id: number;
    title: string;
    price: number;
    author: string;
    created_at: string;
    main_attachment: {
        big: string;
        small: string;
    };
    likes_count: number;
    liked: boolean;
    links: Link[];
}

export interface Link {
    rel: string;
    uri: string;
    methods: string;
}
