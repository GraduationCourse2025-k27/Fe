import React, { useEffect, useState } from "react";
import { Dialog } from "@headlessui/react";
import { PencilLine, Trash, Plus } from "lucide-react";
import * as NewService from "../service/admin/NewsMangement";
import { toast, ToastContainer } from "react-toastify";
import { formatDate } from "../../validation/common/FormatDate";
import NewModal from "../modal/NewModal";
import NewsDeletedModal from "../modal/NewsDeletedModal";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";

const ArticleManagement = () => {
  const [articles, setArticles] = useState([]);
  const [article, setArticle] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [idNews, setIdNews] = useState(3);
  const [isShowDelete, setIsShowModalDelete] = useState(false);
  const [idNewDelete, setIdNewDelete] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 6;

  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = Array.isArray(articles)
    ? articles.slice(firstIndex, lastIndex)
    : [];
  const npage = Array.isArray(articles)
    ? Math.ceil(articles.length / recordsPerPage)
    : 0;
  const numbers = npage > 0 ? [...Array(npage).keys()].map((i) => i + 1) : [];

  useEffect(() => {
    try {
      getAllNews(idNews);
    } catch (error) {
      console.error("Đã xảy ra lỗi khi loading api từ New");
    }
  }, []);

  const openModal = async (news = {}, action) => {
    if (action === "save") {
      setArticle({});
    }
    if (news && action === "edit") {
      await handleNewsById(news?.id);
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleClose = () => {
    setIsShowModalDelete(false);
    setIdNewDelete(0);
  };

  const getAllNews = async (supportId) => {
    try {
      const result = await NewService.getAllNews(supportId);
      if (result) {
        setArticles(result);
      } else {
        setArticles([]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleNewsById = async (id) => {
    try {
      const result = await NewService.findNewsById(id);
      if (result) {
        setArticle(result);
      } else {
        setArticle({});
      }
    } catch (error) {
      console.error(error);
    }
  };
  const handleSaveNews = async (news) => {
    try {
      const result = await NewService.createNews(news);
      if (result) {
        toast.success("Thêm một bài báo thành công");
        getAllNews(idNews);
      } else {
        toast.warning("Thất bại khi thêm một bài báo!");
      }
    } catch (error) {
      toast.error("Lỗi khi loading api");
      console.error(error);
    }
  };

  const handleUpdateNews = async (idNew, News) => {
    try {
      const result = await NewService.updateNews(idNew, News);
      if (result) {
        toast.success("Cập nhật một bài báo thành công ");
        getAllNews(idNews);
      } else {
        toast.warning("Thất bại khi cập nhật một bài báo");
      }
    } catch (error) {
      toast.error("Lỗi khi loading api");
      console.error(error);
    }
  };

  const handleDeleteDoctorModal = (idDoctor) => {
    setIdNewDelete(idDoctor);
    setIsShowModalDelete(true);
  };

  const prePage = (e) => {
    e.preventDefault();
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const nextPage = (e) => {
    e.preventDefault();
    if (currentPage < npage) {
      setCurrentPage(currentPage + 1);
    }
  };

  const changePage = (e, id) => {
    e.preventDefault();
    setCurrentPage(id);
  };

  return (
    <div className="flex flex-col gap-4 px-2 ">
      <div className="flex justify-between items-center ">
        <h2 className="text-2xl font-bold">Quản lý bài viết</h2>
        <button
          onClick={() => openModal(null, "save")}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          <Plus size={18} /> Thêm bài viết
        </button>
      </div>
      <div className="flex flex-col">
        <div className="flex-grow flex flex-col items-center justify-center px-4 py-6">
          <div className="w-full max-w-[1280px] bg-white border rounded overflow-hidden flex flex-col h-[80vh]">
            <div className="flex-grow overflow-y-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="py-3 px-4 text-left text-sm font-semibold">
                      STT
                    </th>
                    <th className="py-3 px-4 text-left text-sm font-semibold">
                      Ảnh
                    </th>
                    <th className="py-3 px-4 text-left text-sm font-semibold">
                      Tiêu đề
                    </th>
                    <th className="py-3 px-4 text-left text-sm font-semibold">
                      Nội dung
                    </th>
                    <th className="py-3 px-4 text-left text-sm font-semibold">
                      Ngày đăng
                    </th>
                    <th className="py-3 px-4 text-left text-sm font-semibold">
                      Thao tác
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {records?.length > 0 ? (
                    records.map((article, index) => (
                      <tr
                        key={article.id}
                        className="!border-t !border-gray-300"
                      >
                        <td className="py-4 px-4 text-sm">{index + 1}</td>
                        <td className="py-4 px-4 text-sm">
                          <img
                            src={article?.imagePath}
                            className="w-10 h-10 rounded-full object-cover"
                          />
                        </td>
                        <td className="py-4 px-4 text-sm font-semibold">
                          {article?.title}
                        </td>
                        <td className="py-4 px-4 text-sm">
                          {article?.content}
                        </td>
                        <td className="py-4 px-4 text-sm">
                          {formatDate(article?.publisherAt)}
                        </td>
                        <td className="py-4 px-4 text-sm">
                          <div className="flex gap-x-3">
                            <button
                              onClick={() => openModal(article, "edit")}
                              className="text-blue-500"
                            >
                              <PencilLine size={20} />
                            </button>
                            <button
                              onClick={() =>
                                handleDeleteDoctorModal(article.id)
                              }
                              className="text-red-500"
                            >
                              <Trash size={20} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr className="h-[300px]">
                      <td colSpan="6" className="text-center py-4">
                        Không có bài viết nào
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
              {npage > 0 && (
                <ul className="flex justify-center items-center gap-2 py-3 border-t border-gray-200">
                  {npage > 1 && (
                    <li>
                      <button
                        className="px-4 py-2 text-blue-900"
                        onClick={prePage}
                      >
                        <BiChevronLeft size={24} />
                      </button>
                    </li>
                  )}
                  {numbers &&
                    numbers.map((n) => (
                      <li key={n}>
                        <button
                          className={`px-4 py-2 border rounded ${
                            currentPage === n
                              ? "bg-blue-900 text-white"
                              : "bg-white text-blue-900"
                          }`}
                          onClick={(e) => changePage(e, n)}
                        >
                          {n}
                        </button>
                      </li>
                    ))}
                  {npage > 1 && (
                    <li>
                      <button
                        className="px-4 py-2 text-blue-900"
                        onClick={nextPage}
                      >
                        <BiChevronRight size={24} />
                      </button>
                    </li>
                  )}
                </ul>
              )}
              <ToastContainer position="top-right" autoClose={1000} />
            </div>
            {isModalOpen && (
              <NewModal
                onClose={closeModal}
                onSave={handleSaveNews}
                onUpdate={handleUpdateNews}
                article={article}
              />
            )}

            {/* Modal Xác nhận xoá */}
            {isShowDelete && (
              <NewsDeletedModal
                show={isShowDelete}
                handleClose={handleClose}
                id={idNewDelete}
                resertDataList={getAllNews}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleManagement;
