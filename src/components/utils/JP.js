import { useInfiniteScroll } from "ahooks";
import tokenService from "../../Services/token.service";
import axios from "axios";
import { JOURNALISTPORTFOLIO } from "../../constants";
import { useRef } from 'react';

export async function getLoadMoreList(URL) {
    const data = await axios.get(URL, {
        headers: {
            Authorization: `Bearer ${tokenService.getLocalAccessToken()}`,
        },
    });
    
    return {
        list: data?.data?.data,
        total: data?.data?.paging?.totalResult,
        nextpagetoken: 
        !!data?.data?.paging?.totalResult
            ? data?.data?.paging?.token
            : undefined,
    };
}

export const usePortfolio = (journalistId) => {
    const ref = useRef();
    const { data, loadMore, loadingMore, noMore, loading } = useInfiniteScroll(
        (param) => {
            if (!!param?.nextpagetoken) {
                return getLoadMoreList(`${JOURNALISTPORTFOLIO}${journalistId}` + "&token=" +
                    encodeURIComponent(param.nextpagetoken));
            } else return getLoadMoreList(`${JOURNALISTPORTFOLIO}${journalistId}`)
        },
        {
            target: ref,
            isNoMore: (param) => param?.nextpagetoken === undefined
        }
    );
    const idata = data;
    return {ref, idata, loadMore, loadingMore, noMore, loading };
};