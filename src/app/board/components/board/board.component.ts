import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

import { BoardsService } from "src/app/shared/services/boards.service";
import { BoardService } from "../../services/board.service";
import { SocketService } from "src/app/shared/services/socket.service";
import { Observable, filter } from "rxjs";
import { BoardsInterface } from "src/app/shared/types/board.interface";
import { SocketEventsEnum } from "src/app/shared/types/socket-events.enum";

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
})
export class BoardComponent implements OnInit {
  boardId: string;
  board$: Observable<BoardsInterface>;

  constructor(
    private boardsService: BoardsService,
    private activatedRoute: ActivatedRoute,
    private boardService: BoardService,
    private socketService: SocketService,
  ) {
    // Get board id from url
    const boardId = this.activatedRoute.snapshot.paramMap.get('boardId');

    // Throw an error if id not recieved
    if (!boardId) throw new Error("Can't get boardID from url");

    // Assign board id
    this.boardId = boardId;

    // Set initial value in board
    this.board$ = this.boardService.board$.pipe(filter(Boolean));
  }

  ngOnInit(): void {
    // Emit a connection event in socket.io
    this.socketService.emit(
      SocketEventsEnum.boardsJoin,
      {
        boardId: this.boardId,
      }
    )

    // Get board details
    this.fetchData();
  }

  // Function to get board details by id
  fetchData(): void {
    // call get board function to get board details from backend
    this.boardsService.geBoard(this.boardId).subscribe({
      next: (board) => {
        // Set the board details to board service. (to behavioral subject)
        this.boardService.setBoard(board);
      }
    })
  }
}
