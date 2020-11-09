import { paginationType } from '../../typings';

export * from '../helper/auth';

export function generatePagination(query: { page?: number | string, pageSize?: number | string}) : paginationType | {} {
    const page = query.page && +query.page || 1;
    const pageSize = query.pageSize && +query.pageSize || -1;
    if (pageSize === -1) {
        return {};
    }
    return {
        offset: (page - 1) * pageSize,
        limit: page * pageSize,
    };
}
