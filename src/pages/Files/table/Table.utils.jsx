import { rankItem } from "@tanstack/match-sorter-utils";
import { filterFns } from "@tanstack/react-table";

export const FuzzyFilter = (row, columnId, value, addMeta) => {

    const itemRank = rankItem(row.getValue(columnId), value);

    addMeta({ itemRank });

    return itemRank.passed;

}