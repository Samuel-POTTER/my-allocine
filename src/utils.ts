export const getCategoryById = (id: number) => {
    switch (id) {
        case 28:
            return 'Action & Adventure';
        case 16:
            return 'Animation';
        case 35:
            return 'Comedy';
        case 80:
            return 'Crime';
        case 99:
            return 'Documentary';
        case 18:
            return 'Drama';
        case 10751:
            return 'Family';
        case 14:
            return 'Fantasy & Sci-Fi';
        case 36:
            return 'History';
        case 27:
            return 'Horror';
        case 10402:
            return 'Music';
        case 9648:
            return 'Mystery';
        case 10749:
            return 'Romance';
        case 53:
            return 'Thriller';
        case 10752:
            return 'War';
        case 37:
            return 'Western';

        default:
            break;
    }
};