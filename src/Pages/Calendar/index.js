import React, { useState } from "react";
import {
  Box,
  Grid,
  Typography,
  IconButton,
  Tabs,
  Tab,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
} from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import dayjs from "dayjs";

const daysOfWeek = ["일", "월", "화", "수", "목", "금", "토"];

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(dayjs());
  const [view, setView] = useState("month"); // "day", "week", "month"
  const [selectedDate, setSelectedDate] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [eventTitle, setEventTitle] = useState("");

  const [events, setEvents] = useState([]); // 저장된 일정 목록

  // 월간, 주간, 일간 뷰에 대한 이동 함수
  const prevMonth = () => setCurrentDate(currentDate.subtract(1, "month"));
  const nextMonth = () => setCurrentDate(currentDate.add(1, "month"));
  const prevDay = () => setCurrentDate(currentDate.subtract(1, "day"));
  const nextDay = () => setCurrentDate(currentDate.add(1, "day"));
  const prevWeek = () => setCurrentDate(currentDate.subtract(1, "week"));
  const nextWeek = () => setCurrentDate(currentDate.add(1, "week"));

  // 월간 뷰 관련 데이터
  const startOfMonth = currentDate.startOf("month");
  const endOfMonth = currentDate.endOf("month");
  const startDay = startOfMonth.day();
  const daysInMonth = currentDate.daysInMonth();

  // 주간 뷰 관련 데이터
  const startOfWeek = currentDate.startOf("week");
  const endOfWeek = currentDate.endOf("week");
  const daysInWeek = [];

  for (let i = 0; i < 7; i++) {
    daysInWeek.push(startOfWeek.add(i, "day"));
  }

  // 일간 뷰 관련 데이터

  const currentFormatted = currentDate.format("YYYY-MM-DD");

  // 월간 뷰 렌더링
  const renderMonthView = () => {
    const calendarCells = [];

    // 첫 번째 주의 비어있는 날짜를 추가
    for (let i = 0; i < startDay; i++) {
      calendarCells.push(<Box key={`empty-${i}`} />);
    }

    // 월의 날짜를 추가
    for (let i = 1; i <= daysInMonth; i++) {
      const date = startOfMonth.add(i - 1, "day").format("YYYY-MM-DD");
      calendarCells.push(
        <Box
          key={i}
          sx={{
            border: "1px solid #ddd",
            padding: 2,
            textAlign: "center",
            height: 80,
            cursor: "pointer",
          }}
          onClick={() => handleDateClick(date)}
        >
          <Typography>{i}</Typography>
          {events
            .filter((event) => event.date === date)
            .map((event, index) => (
              <Typography key={index} variant="body2" color="textSecondary">
                {event.title}
              </Typography>
            ))}
        </Box>
      );
    }

    return (
      <Grid container columns={7}>
        {calendarCells.map((cell, index) => (
          <Grid item xs={1} key={index}>
            {cell}
          </Grid>
        ))}
      </Grid>
    );
  };

  // 주간 뷰 렌더링
  const renderWeekView = () => (
    <Box>
      <Grid container columns={7}>
        {daysInWeek.map((day, index) => (
          <Grid item xs={1} key={index}>
            <Box
              sx={{
                border: "1px solid #ddd",
                padding: 2,
                textAlign: "center",
                height: 80,
              }}
              onClick={() => handleDateClick(day.format("YYYY-MM-DD"))}
            >
              <Typography>{day.format("D")}</Typography>
              {events
                .filter((event) => event.date === day.format("YYYY-MM-DD"))
                .map((event, index) => (
                  <Typography key={index} variant="body2" color="textSecondary">
                    {event.title}
                  </Typography>
                ))}
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );

  // 일간 뷰 렌더링
  const renderDayViewContent = () => {
    return (
      <Box sx={{ padding: 2 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="h5">
            {currentDate.format("YYYY년 MM월 DD일")}
          </Typography>
          <Button
            variant="outlined"
            size="small"
            onClick={() => handleDateClick(currentFormatted)}
          >
            일정 추가
          </Button>
        </Box>

        {events
          .filter((event) => event.date === currentFormatted)
          .map((event, index) => (
            <Typography
              key={index}
              variant="body2"
              color="textSecondary"
              sx={{ mt: 1 }}
            >
              {event.title}
            </Typography>
          ))}
      </Box>
    );
  };

  // 일정 추가 팝업 열기
  const handleDateClick = (date) => {
    setSelectedDate(date);
    setOpenDialog(true);
  };

  // 일정 저장
  const handleSaveEvent = () => {
    const newEvent = { date: selectedDate, title: eventTitle };
    setEvents((prevEvents) => [...prevEvents, newEvent]);
    setOpenDialog(false);
    setEventTitle(""); // 일정을 입력 후 입력란 초기화
  };

  return (
    <Box sx={{ width: "100%", maxWidth: 800, mx: "auto", mt: 4 }}>
      {/* 뷰 선택 탭 */}
      <Tabs
        value={view}
        onChange={(event, newValue) => setView(newValue)}
        centered
      >
        <Tab label="일간" value="day" />
        <Tab label="주간" value="week" />
        <Tab label="월간" value="month" />
      </Tabs>

      {/* 헤더 */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        {view === "month" && (
          <>
            <IconButton onClick={prevMonth}>
              <ArrowBackIosIcon />
            </IconButton>
            <Typography variant="h5">
              {currentDate.format("YYYY년 MM월")}
            </Typography>
            <IconButton onClick={nextMonth}>
              <ArrowForwardIosIcon />
            </IconButton>
          </>
        )}

        {view === "week" && (
          <>
            <IconButton onClick={prevWeek}>
              <ArrowBackIosIcon />
            </IconButton>
            <Typography variant="h5">{`${startOfWeek.format(
              "YYYY년 MM월 DD일"
            )} - ${endOfWeek.format("YYYY년 MM월 DD일")}`}</Typography>
            <IconButton onClick={nextWeek}>
              <ArrowForwardIosIcon />
            </IconButton>
          </>
        )}

        {view === "day" && (
          <>
            <IconButton onClick={prevDay}>
              <ArrowBackIosIcon />
            </IconButton>
            <Typography variant="h5">
              {currentDate.format("YYYY년 MM월 DD일")}
            </Typography>
            <IconButton onClick={nextDay}>
              <ArrowForwardIosIcon />
            </IconButton>
          </>
        )}
      </Box>

      {/* 뷰에 따른 달력 렌더링 */}
      {view === "month" && renderMonthView()}
      {view === "week" && renderWeekView()}
      {view === "day" && renderDayViewContent()}

      {/* 일정 추가 팝업 */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>일정 추가</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="일정 제목"
            type="text"
            fullWidth
            variant="outlined"
            value={eventTitle}
            onChange={(e) => setEventTitle(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} color="primary">
            취소
          </Button>
          <Button onClick={handleSaveEvent} color="primary">
            저장
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Calendar;
