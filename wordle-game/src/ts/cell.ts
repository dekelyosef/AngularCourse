type Status = "empty" | "wrong" | "exists" | "exact";

export class Cell {
    constructor(private status: Status, private content: string = "") {
        this.status = status;
        this.content = content;
    }

    get getCellStatus(): Status {
        return this.status;
    }

    get getCellContent(): string {
        return this.content;
    }

    set setCellStatus(status: Status) {
        this.status = status;
    }

    set setCellContent(content: string) {
        this.content = content;
    }

}