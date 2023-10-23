const { StatusCodes } = require("http-status-codes");
const Job = require("../models/Job");
const { NotFoundError, BadRequestError } = require("../errors");

const getAllJobs = async (req, res) => {
  const job = await Job.find({ createdBy: req.user.userId }).sort("createdAt");
  res.status(StatusCodes.OK).json({
    job,
  });
};
const createJob = async (req, res) => {
  const { company, position, status } = req.body;

  const job = await Job.create({
    company,
    position,
    status,
    createdBy: req.user.userId,
  });
  console.log(req.user);
  res.status(StatusCodes.CREATED).json({ job });
};
const getJob = async (req, res) => {
  const job = await Job.find({
    _id: req.params.id,
    createdBy: req.user.userId,
  });

  if (job.length === 0) {
    throw new NotFoundError("couldnt find the job");
  }
  res.status(StatusCodes.OK).json(job);
};
const updateJob = async (req, res) => {
  const {
    body: { company, position },
    user: { userId },
    params: { id: jobsId },
  } = req;

  if (company === "" || position === "") {
    throw new BadRequestError("company or position fields cannot be empty");
  }
  const job = await Job.findByIdAndUpdate(
    {
      _id: jobsId,
      createdBy: userId,
    },
    req.body,
    { new: true }
  );

  res.status(StatusCodes.OK).json(job);
};
const deleteJob = async (req, res) => {
  const job = await Job.findByIdAndDelete({
    _id: req.params.id,
    createdBy: req.user.userId,
  });

  res.status(StatusCodes.OK).json({ msg: "done" });
};

module.exports = {
  getAllJobs,
  createJob,
  getJob,
  updateJob,
  deleteJob,
};
