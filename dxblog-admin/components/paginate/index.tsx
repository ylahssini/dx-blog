import { Icon } from '@chakra-ui/react';
import { MdArrowForward, MdArrowBack } from 'react-icons/md';
import ReactPaginate from 'react-paginate';

export default function Paginate({ handlePage, count = 1, limit = process.env.NEXT_PUBLIC_LIMIT as unknown as number }) {
    return (
        <ReactPaginate
            breakLabel="..."
            nextLabel={<><span>Next</span> <Icon as={MdArrowForward} /></>}
            pageRangeDisplayed={limit}
            pageCount={Math.ceil(count / limit)}
            previousLabel={<><Icon as={MdArrowBack} /> <span>Previous</span></>}
            renderOnZeroPageCount={null}
            onPageChange={handlePage}
            className="paginate"
        />
    );
}
