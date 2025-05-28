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
  const [idNews, setIdNews] = useState(localStorage.getItem("id") || "");
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
    const handleStorageChange = () => {
      const newIdNews = localStorage.getItem("id") || "";
      setIdNews(newIdNews);
    };
    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  useEffect(() => {
    if (idNews) {
      getAllNews(idNews);
    } else {
      console.warn("Không tìm thấy idNews trong localStorage");
      setArticles([]);
    }
  }, [idNews]);

  console.log("idStaff", idNews);

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
      setArticles(result || []);
    } catch (error) {
      console.error(error);
    }
  };

  const handleNewsById = async (id) => {
    try {
      const result = await NewService.findNewsById(id);
      setArticle(result || {});
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
        toast.success("Cập nhật một bài báo thành công");
        getAllNews(idNews);
      } else {
        toast.warning("Thất bại khi cập nhật một bài báo");
      }
    } catch (error) {
      toast.error("Lỗi khi loading api");
      console.error(error);
    }
  };
  console.log("id", idNews);

  const handleDeleteDoctorModal = (idDoctor) => {
    setIdNewDelete(idDoctor);
    setIsShowModalDelete(true);
  };

  const prePage = (e) => {
    e.preventDefault();
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const nextPage = (e) => {
    e.preventDefault();
    if (currentPage < npage) setCurrentPage(currentPage + 1);
  };

  const changePage = (e, id) => {
    e.preventDefault();
    setCurrentPage(id);
  };

  return (
    <div className="flex flex-col gap-4 px-2">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold ml-7">Quản lý bài viết</h2>
        <button
          onClick={() => openModal(null, "save")}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          <Plus size={18} /> Thêm bài viết
        </button>
      </div>
      <div className="flex justify-center px-4">
        <div className="w-full max-w-6xl bg-white border  rounded flex flex-col min-h-[65vh]">
          <div className="flex-grow ">
            <table className="min-w-full divide-y divide-gray-200 table-fixed">
              <thead className="bg-gray-100 text-gray-600 text-sm sticky top-0 z-10">
                <tr>
                  <th className="py-2 px-4 text-left font-semibold w-[5%]">
                    STT
                  </th>
                  <th className="py-2 px-4 text-left font-semibold w-[10%]">
                    Ảnh
                  </th>
                  <th className="py-2 px-4 text-left font-semibold w-[20%]">
                    Tiêu đề
                  </th>
                  <th className="py-2 px-4 text-left font-semibold w-[35%]">
                    Nội dung
                  </th>
                  <th className="py-2 px-4 text-left font-semibold w-[15%]">
                    Ngày đăng
                  </th>
                  <th className="py-2 px-4 text-left font-semibold w-[15%]">
                    Thao tác
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {records?.length > 0 ? (
                  records.map((article, index) => (
                    <tr
                      key={article.id}
                      className="h-[60px] !border-t !border-gray-200"
                    >
                      <td className="py-2 px-4 text-sm">
                        {firstIndex + index + 1}
                      </td>
                      <td className="py-2 px-4 text-sm">
                        <div className="w-10 h-10 flex items-center justify-center">
                          <img
                            src={article?.imagePath}
                            className="w-full h-full rounded-full object-cover"
                            alt="Article"
                          />
                        </div>
                      </td>
                      <td className="py-2 px-4 text-sm font-semibold truncate">
                        {article?.title}
                      </td>
                      <td className="py-2 px-4 text-sm truncate">
                        <div className="truncate max-w-[200px]">
                          {article?.content}
                        </div>
                      </td>
                      <td className="py-2 px-4 text-sm">
                        {formatDate(article?.publisherAt)}
                      </td>
                      <td className="py-2 px-4 text-sm">
                        <div className="flex gap-x-3">
                          <button
                            onClick={() => openModal(article, "edit")}
                            className="text-blue-500 hover:text-blue-700 transition-colors"
                            aria-label="Edit article"
                          >
                            <PencilLine size={20} />
                          </button>
                          <button
                            onClick={() => handleDeleteDoctorModal(article.id)}
                            className="text-red-500 hover:text-red-700 transition-colors"
                            aria-label="Delete article"
                          >
                            <Trash size={20} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr className="h-[360px]">
                    <td colSpan="6" className="text-center py-4 text-gray-500">
                      Không có bài viết nào
                    </td>
                  </tr>
                )}
                {records?.length > 0 &&
                  records.length < recordsPerPage &&
                  Array.from({ length: recordsPerPage - records.length }).map(
                    (_, index) => (
                      <tr key={`empty-${index}`} className="h-[60px]">
                        <td colSpan="6" className="py-3 px-4"></td>
                      </tr>
                    )
                  )}
              </tbody>
            </table>
          </div>
          {npage > 0 && (
            <ul className="pagination flex !justify-center items-center py-2 gap-2 border-t border-gray-200">
              {npage > 1 && (
                <li className="page-item">
                  <button
                    className="page-link px-4 py-2 text-blue-900 flex items-center"
                    onClick={prePage}
                  >
                    <BiChevronLeft size={24} />
                  </button>
                </li>
              )}
              {numbers &&
                numbers.map((n) => (
                  <li className="page-item" key={n}>
                    <button
                      className={`page-link px-4 py-2 border rounded ${
                        currentPage === n
                          ? "bg-blue-900 text-blue"
                          : "bg-white text-blue-900"
                      }`}
                      onClick={(e) => changePage(e, n)}
                    >
                      <span className="text-blue">{n}</span>
                    </button>
                  </li>
                ))}
              {npage > 1 && (
                <li className="page-item">
                  <button
                    className="page-link px-4 py-2 text-blue-900 flex items-center"
                    onClick={nextPage}
                  >
                    <BiChevronRight size={24} />
                  </button>
                </li>
              )}
            </ul>
          )}
          <ToastContainer position="top-right" autoClose={1000} />
          {isModalOpen && (
            <NewModal
              onClose={closeModal}
              onSave={handleSaveNews}
              onUpdate={handleUpdateNews}
              article={article}
            />
          )}
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
  );
};

export default ArticleManagement;
