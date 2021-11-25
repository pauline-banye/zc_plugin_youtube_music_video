import styled from "styled-components";
import {
	changedCurrentSong,
	changedPlaying,
	showedPlayer
} from "../../app/playerSlice";
import LikeOptionCount from "./likeOptionCount";
import { useAppDispatch, useAppSelector } from "../../app/hooks";

interface Props {
	song: Song;
	users: User[];
}

function PlaylistItem(props: Props) {
	const {
		title,
		addedBy,
		albumCover,
		id: songId,
		userId,
		duration,
		likedBy
	} = props.song;

	const dispatch = useAppDispatch();

	const currentSongId = useAppSelector(
		(_state: any) => _state.player.currentSongId
	);

	const user = props.users.find(user => user.id === userId);

	const handlePlay = e => {
		if (e.target.dataset.play || e.target.closest(".item-group-1")) {
			dispatch(changedCurrentSong(props.song));
			dispatch(showedPlayer(true));
			dispatch(changedPlaying(true));
		}
	};

	return (
		<Wrapper
			data-play
			isPlaying={currentSongId === props.song.id}
			onClick={handlePlay}
		>
			<div className="item-group-1">
				<img src={albumCover} alt="album cover" className="item-albumCover" />
				<div className="item-info">
					<div className="item-title">{title}</div>

					<div className="item-addedBy">
						Added by <span>{user?.name ?? addedBy}</span>
					</div>
				</div>
			</div>

			<LikeOptionCount song={props.song} />
			{/* <div className="handle-play" onClick={handlePlay}></div> */}
		</Wrapper>
	);
}

const Wrapper = styled.div<{ isPlaying: boolean }>`
	position: relative;
	box-sizing: border-box;
	display: flex;
	justify-content: space-between;
	background: ${props => (props.isPlaying ? "#CBFFEE" : "inherit")};
	font-family: "Lato", sans-serif;
	transition: all 200ms ease-in-out;
	/* box-shadow: 0px 4px 6px rgba(0, 36, 24, 0.04); */
	height: 50px;
	margin-bottom: 8px;
	cursor: pointer;

	.handle-play {
		position: absolute;
		width: -webkit-fill-available;
		height: 100%;
		&:hover {
			box-shadow: 0 4px 6px rgba(0, 184, 124, 0.4);
		}
	}

	.item-group-1 {
		display: flex;
		justify-items: center;
	}
	.item-group-1.now-playing {
		background-color: #cbffee;
	}

	.item-albumCover {
		display: block;
		margin-right: 20px;
		margin-left: 10px;
		width: 100%;
		max-width: 50px;
		flex-grow: 0;
		border-radius: 4px;
	}

	.item-info {
		width: 220px;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}

	.item-title {
		flex-basis: 100%;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		font-weight: 700;
		font-size: 15px;
	}

	.item-addedBy {
		font-size: 13px;
		span {
			cursor: pointer;
			text-decoration: underline;
		}
	}

	@media screen and (max-width: 700px) {
		.item-info {
			width: 200px;
		}
	}

	@media screen and (max-width: 600px) {
		.item-info {
			width: 150px;
		}
		.item-albumCover {
			margin-left: 0;
			margin-right: 10px;
		}
	}
`;

export default PlaylistItem;
