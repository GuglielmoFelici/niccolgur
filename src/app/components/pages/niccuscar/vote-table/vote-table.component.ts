import {Component, Input, OnInit} from '@angular/core';
import {NiccuscarVote} from "../niccuscar.component";
import {MatTableDataSource} from "@angular/material/table";
import {User} from "../../../../ts/domain";

@Component({
    selector: 'app-vote-table',
    templateUrl: './vote-table.component.html',
    styleUrls: ['./vote-table.component.css']
})
export class VoteTableComponent implements OnInit {


    @Input() vote: NiccuscarVote
    @Input() masters: User[];
    selectedMaster: User;

    constructor() {
    }

    ngOnInit(): void {
        this.selectedMaster = this.masters[0]
    }

    isMasterTable() {
        return this.vote.type === 'MASTER'
    }

    hasData() {
        return !!this.datasource.data.length
    }

    getData() {
        return this.isMasterTable()
            ? this.selectedMaster && this.vote.masterCandidates[this.selectedMaster.id]
            : this.vote.candidates
    }

    get datasource () {
        return new MatTableDataSource(this.getData())
    }

    masterChange(master, event) {
        // if (event.source.checked) {
        //     this.selectedMaster = master;
        // }
    }

    moveCandidate(i, up: boolean) {
        const new_index = i+(up ? -1 : +1);
        const oldElem = this.getData()[i];
        const newElem = this.getData()[new_index];
        if (!newElem) {
            return
        }
        this.getData()[i] = newElem
        this.getData()[new_index] = oldElem
    }

    deleteCandidate(candidate) {
        if (this.isMasterTable() && this.selectedMaster) {
            this.vote.masterCandidates[this.selectedMaster.id] = this.vote.masterCandidates[this.selectedMaster.id].filter(e => e !== candidate)
        } else {
            this.vote.candidates = this.vote.candidates.filter(e => e !== candidate)
        }
    }
}
